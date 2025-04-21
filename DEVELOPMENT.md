# Development Guide <!-- omit from toc -->

Welcome to the Clearance Lab development environment! The entire project is designed for quick setup using VSCode dev containers.

This guide will walk you through getting started, understanding available launch options, configuring environment variables, and how builds and deployment work.

- [Getting Started with VS Code Dev Containers](#getting-started-with-vs-code-dev-containers)
- [Available Launch Commands](#available-launch-commands)
- [Environment Variables](#environment-variables)
  - [Local Development](#local-development)
  - [Production](#production)
- [Build Process](#build-process)
- [Database Setup](#database-setup)
- [CI builds and deployment](#ci-builds-and-deployment)
  - [CI builds](#ci-builds)
  - [Deployment](#deployment)

## Getting Started with VS Code Dev Containers

To spin up the project in a fully configured development environment:

1. **Install Requirements:**

   - [Docker](https://www.docker.com/)
   - [VS Code](https://code.visualstudio.com/)
   - [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

2. **Clone the Repo Using a Container Volume:**
   - Open the Command Palette: `Ctrl+Shift+P`
   - Select: `Dev Containers: Clone Repository in Container Volume`
   - Enter: `https://github.com/neilenns/clearancelab`
   - Choose a folder name
   - VS Code will automatically clone, build the container, and open the repo inside it

## Available Launch Commands

From the **Run and Debug** sidebar (`Ctrl+Shift+D`), you’ll find these launch configs:

- **`Clearance Lab (All)`**  
  Launches both API and Web concurrently using `turbo run dev`. Ideal for full-stack development.

- **`Clearance Lab (API)`**  
  Starts the Express.js server (`apps/api`). Useful for backend development and testing endpoints.

- **`Clearance Lab (Web)`**  
  Runs the Next.js frontend (`apps/web`). Great for iterating on the user interface.

## Environment Variables

### Local Development

Default values for local development are set in the `devcontainer.json` file:

| Variable                     | Description                                             | Value                    |
| ---------------------------- | ------------------------------------------------------- | ------------------------ |
| `MONGO_DB_CONNECTION_STRING` | URI to the local MongoDB instance.                      | `mongodb://db:27017/`    |
| `MONGO_DB_NAME`              | Name of the database with the development data.         | `clearancelab`           |
| `API_BASE_URL`               | Address of the api server, accessed by the web project. | `http://localhost:4503/` |

To speed builds the following environment variables can be set to enable TurboRepo remote caching:

| Variable      | Description                                |
| ------------- | ------------------------------------------ |
| `TURBO_TEAM`  | Team name.                                 |
| `TURBO_API`   | URI to the Turbo remote cache instance.    |
| `TURBO_TOKEN` | Token to grant access to the remote cache. |

### Production

The API server supports the following variables:

| Variable                     | Description                                                                                                                                                                 | Required |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `MONGO_DB_CONNECTION_STRING` | URI to the MongoDB instance.                                                                                                                                                | ✅       |
| `MONGO_DB_NAME`              | Name of the database with the development data.                                                                                                                             | ✅       |
| `TRUST_PROXY`                | Configures the [ExpressJS `trust proxy` setting](https://expressjs.com/en/guide/behind-proxies.html). If the server is deployed behind a Cloudflare tunnel set this to `1`. |          |

The web UI deploys as a Cloudflare worker via the [GitHub release workflow](#deployment). The following variables and secrets are supported:

| Variable       | Description                                                                                                                             | Required |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `API_BASE_URL` | URI to the API server. Configured in [`wrangler.jsonc`](apps/web/wrangler.jsonc).                                                       | ✅       |
| `API_KEY`      | API key for access to the API server. Configured in GitHub as a repository secret and pushed to Cloudflare during the release workflow. | ✅       |

## Build Process

This is a monorepo powered by **Turborepo** and **pnpm**.

- **Local builds**:

In most situations, local builds should be done with the [VS Code launch commands](#available-launch-commands). To build from the command line, use the following commands:

| Command       | Description                                         |
| ------------- | --------------------------------------------------- |
| `turbo dev`   | Build and run debuggable instances.                 |
| `turbo ci`    | Build everything but skip static page generation.   |
| `turbo build` | Build everything, including static page generation. |

## Database Setup

A MongoDB instance is automatically spun up inside the devcontainer and pre-seeded with example data during initialization.

- Data is loaded via the [`post-create.sh`](.devcontainer/post-create.sh) script using `mongosh` and `mongoimport`
- The database is named `clearancelab` and contains:
  - `scenarios`: sample scenario data
  - `airportinfo`: airport metadata

To add or update data:

1. Add or edit the JSON files under the [`seed/`](.devcontainer/seed/) folder
2. Rebuild the devcontainer, or run [`./seed/init.sh`](.devcontainer/seed/init.sh) inside the container to manually re-seed

The MongoDB VS Code extension is installed automatically and includes a connection named `Clearance Lab local dev` for access to the local database. To access the database from tools like MongoDBCompass use the value of the `MONGO_DB_CONNECTION_STRING` environment variable from [`devcontainer.json`](.devcontainer/devcontainer.json).

## CI builds and deployment

CI builds and deployment are handled by GitHub workflows.

### CI builds

All pull requests automatically have the following jobs run:

- **CI - Monorepo**: Builds the monorepo and runs lint.
- **CI - Docker**: Builds the API docker image.
- **CI - Require label**: Requires a label on every pull request, for automatic release notes generation.
- **Devcontainer - Build**: Builds the devcontainer image

All jobs leverage a TurboRepo remote cache and prune to only run when dependent files changed.

### Deployment

Deployments are triggered either by pushes to main or GitHub releases.

- **Devcontainer - Build**: Builds the devcontainer image on pushes to `main`.
- **Release - Build Docker image**: Builds the API Docker image and publishes it to the container repository.
- **Release - Cloudflare**: Builds the website and deploys to a Cloudflare worker.

The only part that requires manual deployment is updating whatever Docker instance is running the API Docker image.
