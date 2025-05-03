# Development guide <!-- omit from toc -->

Welcome to the Clearance Lab development environment! The entire project is designed for quick setup using VSCode dev containers.

This guide will walk you through getting started, understanding available launch options, configuring environment variables, and how builds and deployment work.

- [Getting started with VS Code dev containers](#getting-started-with-vs-code-dev-containers)
- [Available launch commands](#available-launch-commands)
- [Database setup](#database-setup)
- [Environment variables](#environment-variables)
  - [Local development](#local-development)
  - [Production](#production)
- [Build process and deployment](#build-process-and-deployment)
  - [Local builds](#local-builds)
  - [CI builds](#ci-builds)
  - [Deployment](#deployment)

## Getting started with VS Code dev containers

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

## Available launch commands

From the **Run and Debug** sidebar (`Ctrl+Shift+D`), you’ll find these [launch configurations](.vscode/launch.json):

- **`Clearance Lab (All)`**  
  Launches both API and Web concurrently using `turbo run dev`. Ideal for full-stack development.

- **`Clearance Lab (API)`**  
  Starts the Express.js server (`apps/api`). Useful for backend development and testing endpoints.

- **`Clearance Lab (Web)`**  
  Runs the Next.js frontend (`apps/web`). Great for iterating on the user interface.

## Database setup

A MongoDB instance is automatically spun up inside the devcontainer and pre-seeded with example data during initialization.

- Data is loaded via the [`post-create.sh`](.devcontainer/post-create.sh) script using `mongosh` and `mongoimport`
- The database is named `clearancelab` and contains:
  - `scenarios`: sample scenario data
  - `airportinfo`: airport metadata

To add or update data:

1. Add or edit the JSON files under the [`seed/`](.devcontainer/seed/) folder.
2. Rebuild the devcontainer, or run [`./seed/init.sh`](.devcontainer/seed/init.sh) inside the container to manually re-seed.

The MongoDB VS Code extension is installed automatically and includes a connection named `Clearance Lab local dev` for access to the local database. To access the database from tools like MongoDB Compass, use the value of the `MONGO_DB_CONNECTION_STRING` environment variable from [`devcontainer.json`](.devcontainer/devcontainer.json).

## Environment variables

### Local development

Default values for local development are set in the [`devcontainer.json`](.devcontainer/devcontainer.json) file:

| Variable                     | Description                                             | Value                    |
| ---------------------------- | ------------------------------------------------------- | ------------------------ |
| `MONGO_DB_CONNECTION_STRING` | URI to the local MongoDB instance.                      | `mongodb://db:27017/`    |
| `MONGO_DB_NAME`              | Name of the database with the development data.         | `clearancelab`           |
| `API_BASE_URL`               | Address of the api server, accessed by the web project. | `http://localhost:4503/` |

The API server also needs two Auth0 variables set to validate secured endpoints. These are not currently set automatically, and you'll have to ask for the values from the project maintainers.

| Variable         | Description                                     |
| ---------------- | ----------------------------------------------- |
| `AUTH0_DOMAIN`   | Domain of the Auth0 Clearance Lab application.  |
| `AUTH0_AUDIENCE` | URL for the API created in the Auth0 dashboard. |

There are additional security-related variables to configure CORS and rate-limiting:

| Variable                       | Description                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------- |
| `API_RATE_LIMIT_MAX`           | Maximum number of requests per window. Default 100.                             |
| `API_RATE_LIMIT_MINUTE_WINDOW` | Time window for rate limiting in minutes. Default 5.                            |
| `WHITELISTED_DOMAINS`          | List of domains that are allowed via CORS. Separate multiple domains with `\|`. |

The web app also needs several Auth0 variables set to validate secured endpoints. These are not currently set automatically, and you'll have to ask for the values from the project maintainers.

| Variable              | Description                                                                                         | Required |
| --------------------- | --------------------------------------------------------------------------------------------------- | -------- |
| `AUTH0_AUDIENCE`      | URL for the API created in the Auth0 dashboard.                                                     | ✅       |
| `AUTH0_CLIENT_ID`     | Client ID of the Clearance Lab application in Auth0.                                                | ✅       |
| `AUTH0_CLIENT_SECRET` | Client-side secret for Auth0.                                                                       | ✅       |
| `AUTH0_DOMAIN`        | Domain of the Clearance Lab application in Auth0. This must be a valid URI and start with https://. | ✅       |
| `AUTH0_SECRET`        | Secret for the Clearance Lab application in Auth0.                                                  | ✅       |

To speed builds, the following environment variables can be set to enable TurboRepo remote caching:

| Variable      | Description                                |
| ------------- | ------------------------------------------ |
| `TURBO_TEAM`  | Team name.                                 |
| `TURBO_API`   | URI to the Turbo remote cache instance.    |
| `TURBO_TOKEN` | Token to grant access to the remote cache. |

> [!IMPORTANT]
> If new environment variables are added to the code, they must be added to the dependency list in [`turbo.json`](./turbo.json). Otherwise, they will not be available to the tasks when run.

### Production

The API server supports the following variables:

| Variable                     | Description                                                                                                                                                                   | Required |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `MONGO_DB_CONNECTION_STRING` | URI to the MongoDB instance.                                                                                                                                                  | ✅       |
| `MONGO_DB_NAME`              | Name of the database with the development data.                                                                                                                               | ✅       |
| `TRUST_PROXY`                | Configures the [Express.js `trust proxy` setting](https://expressjs.com/en/guide/behind-proxies.html). If the server is deployed behind a Cloudflare, tunnel set this to `1`. |          |

The web UI deploys as a Cloudflare worker via the [GitHub release workflow](#deployment). The following variables and secrets are supported:

| Variable              | Description                                                                                         | Required |
| --------------------- | --------------------------------------------------------------------------------------------------- | -------- |
| `API_BASE_URL`        | URI to the API server.                                                                              | ✅       |
| `API_KEY`             | API key for access to the API server.                                                               | ✅       |
| `APP_BASE_URL`        | URI to the web app.                                                                                 | ✅       |
| `AUTH0_AUDIENCE`      | URL for the API created in the Auth0 dashboard.                                                     | ✅       |
| `AUTH0_CLIENT_ID`     | Client ID of the Clearance Lab application in Auth0.                                                | ✅       |
| `AUTH0_CLIENT_SECRET` | Client-side secret for Auth0.                                                                       | ✅       |
| `AUTH0_DOMAIN`        | Domain of the Clearance Lab application in Auth0. This must be a valid URI and start with https://. | ✅       |
| `AUTH0_SECRET`        | Secret for the Clearance Lab application in Auth0.                                                  | ✅       |
| `DEPLOY_ENV`          | Deployment environment, either `prod` or `dev`.                                                     | ✅       |

The environment variables are set in the [`wrangler.toml`](apps/web/wrangler.toml) file and in GitHub environment variables. They must be set in both places, so the CI builds will pass environment variable verification.

The API key and Auth0 secrets are stored as GitHub secrets and are pushed to Cloudflare during the release workflow.

## Build process and deployment

This is a monorepo powered by **Turborepo** and **pnpm**. The structure is based on the [kitchen-sink turborepo example](https://github.com/vercel/turborepo/tree/main/examples/kitchen-sink). Package builds are done using [`bunchee`](https://github.com/huozhi/bunchee).

### Local builds

In most situations, local builds should be done with the [VS Code launch commands](#available-launch-commands). To build from the command line, use the following commands:

| Command       | Description                                             |
| ------------- | ------------------------------------------------------- |
| `turbo build` | Build everything, including static page generation.     |
| `turbo ci`    | Build everything but skip static page generation.       |
| `turbo clean` | Removes all `node_modules`, `dist` and `.next` folders. |
| `turbo dev`   | Build and run debuggable instances.                     |

### CI builds

CI is handled by GitHub workflows. All pull requests automatically have the following jobs run:

- **CI - Monorepo**: Builds the monorepo and runs lint.
- **CI - Docker**: Builds the API docker image.
- **CI - Require label**: Requires a label on every pull request, for automatic release notes generation.
- **Devcontainer - Build**: Builds the devcontainer image

All jobs leverage a TurboRepo remote cache and prune to only run when dependent files changed.

### Deployment

Deployments to the `dev` environment are triggered manually by running the [`Deploy - dev`](.github/workflows/deploy-dev.yaml) workflow in GitHub. Deployments to the `prod` environment are triggered by the [`Deploy - prod`](.github/workflows/deploy-prod.yaml) workflow.

The only part that requires manual deployment is updating the Docker instance running the API server Docker image.
