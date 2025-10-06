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

Default values for local development are set in the [`devcontainer.env`](.devcontainer/devcontainer.env) file:

| Variable                     | Description                                             | Value                    |
| ---------------------------- | ------------------------------------------------------- | ------------------------ |
| `MONGO_DB_CONNECTION_STRING` | URI to the local MongoDB instance.                      | `mongodb://db:27017/`    |
| `MONGO_DB_NAME`              | Name of the database with the development data.         | `clearancelab`           |
| `API_BASE_URL`               | Address of the API server, accessed by the web project. | `http://localhost:4503/` |
| `AUDIO_BASE_URL`             | Address for serving audio files.                        | `http://localhost:4503/` |
| `PNPM_STORE`                 | Location of the pnpm package cache.                     | `/pnpm-store`            |
| `DISABLE_AUTH`               | Disables Auth0 authentication.                          | `true`                   |
| `NEXT_PUBLIC_DISABLE_AUTH`   | Disables Auth0 authentication in the web app.           | `true`                   |

#### Authentication

Auth0 is disabled by default. To enable it, create a file called `devcontainer.env.overrides` in the `./devcontainer/` folder and set the `DISABLE_AUTH` variable to `false`. When adding a `devcontainer.env.overrides` file, you must reopen the devcontainer for the changes to take effect.

For Auth0 to work on the API server, the following variables must be set, either via a `.env.local` file in the `apps/api` folder or in the `devcontainer.env.overrides` file:

| Variable         | Description                                                                                            | Required when auth enabled |
| ---------------- | ------------------------------------------------------------------------------------------------------ | -------------------------- |
| `AUTH0_DOMAIN`   | Domain of the Auth0 Clearance Lab application. Copy the value exactly as shown in the AUTH0 dashboard. | ✅                         |
| `AUTH0_AUDIENCE` | URL for the API created in the Auth0 dashboard.                                                        | ✅                         |

The web app also needs several Auth0 variables set to validate secured endpoints. These are only required if you want to test authentication locally (when `DISABLE_AUTH` is set to `false` and `NEXT_PUBLIC_DISABLE_AUTH` is set to `false`). These can be set in the `devcontainer.env.overrides` file or in a `.env.local` file in the `apps/web` folder.

| Variable              | Description                                                                                               | Required when auth enabled |
| --------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------- |
| `AUTH0_AUDIENCE`      | URL for the API created in the Auth0 dashboard.                                                           | ✅                         |
| `AUTH0_CLIENT_ID`     | Client ID of the Clearance Lab application in Auth0.                                                      | ✅                         |
| `AUTH0_CLIENT_SECRET` | Client-side secret for Auth0.                                                                             | ✅                         |
| `AUTH0_DOMAIN`        | Domain of the Clearance Lab application in Auth0. Copy the value exactly as shown in the AUTH0 dashboard. | ✅                         |
| `AUTH0_SECRET`        | Secret for the Clearance Lab application in Auth0.                                                        | ✅                         |

#### Optional configuration

There are additional optional variables for configuring the API server and web app:

**API Server:**

| Variable              | Description                                                                            | Default Value        |
| --------------------- | -------------------------------------------------------------------------------------- | -------------------- |
| `PORT`                | Port for the API server.                                                               | `4503`               |
| `HEALTH_PORT`         | Port for the health check endpoint.                                                    | `4504`               |
| `LOG_LEVEL`           | Logging level: `error`, `warn`, `info`, or `debug`.                                    | `info`               |
| `WHITELISTED_DOMAINS` | List of domains that are allowed via CORS. Separate multiple domains with `\|`.        | `http://localhost:*` |
| `TRUST_PROXY`         | Configures Express.js `trust proxy` setting. Set to `1` if behind a reverse proxy.    | `0`                  |
| `VERSION`             | Version identifier for the API server.                                                 | `dev`                |
| `SSL_PRIVATE_KEY_PATH` | Path to SSL private key file (for HTTPS).                                              | (empty)              |
| `SSL_FULL_CHAIN_PATH` | Path to SSL full chain certificate file (for HTTPS).                                   | (empty)              |

**Web App:**

| Variable            | Description                                                           | Default Value          |
| ------------------- | --------------------------------------------------------------------- | ---------------------- |
| `SAMPLE_SCENARIO_ID` | MongoDB ID of the sample scenario to display in documentation.        | `6802cef1cd28e1a43a89e8d9` |
| `APP_BASE_URL`      | Base URL of the web application (used for canonical URLs, etc.).      | (optional)             |

#### Turborepo remote caching

To speed builds, the following environment variables can be set to enable TurboRepo remote caching:

| Variable      | Description                                |
| ------------- | ------------------------------------------ |
| `TURBO_TEAM`  | Team name.                                 |
| `TURBO_TOKEN` | Token to grant access to the remote cache. |

> [!IMPORTANT]
> If you add new environment variables in the code, also add them to the dependency list in the root [`turbo.json`](./turbo.json), or to the project-specific `turbo.json`. Otherwise, those variables will not be available when tasks run.

### Production

#### API Server

The API server is deployed as a Docker container. The following environment variables are supported:

| Variable                     | Description                                                                                                                                                                   | Required |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `MONGO_DB_CONNECTION_STRING` | URI to the MongoDB instance.                                                                                                                                                  | ✅       |
| `MONGO_DB_NAME`              | Name of the database.                                                                                                                                                        | ✅       |
| `AUTH0_DOMAIN`               | Domain of the Auth0 Clearance Lab application. Copy the value exactly as shown in the AUTH0 dashboard.                                                                       | ✅       |
| `AUTH0_AUDIENCE`             | URL for the API created in the Auth0 dashboard.                                                                                                                              | ✅       |
| `PORT`                       | Port for the API server.                                                                                                                                                     |          |
| `HEALTH_PORT`                | Port for the health check endpoint.                                                                                                                                          |          |
| `LOG_LEVEL`                  | Logging level: `error`, `warn`, `info`, or `debug`.                                                                                                                          |          |
| `TRUST_PROXY`                | Configures the [Express.js `trust proxy` setting](https://expressjs.com/en/guide/behind-proxies.html). If the server is deployed behind a Cloudflare tunnel, set this to `1`. |          |
| `VERSION`                    | Version identifier for the API server (automatically set during deployment).                                                                                                  |          |
| `WHITELISTED_DOMAINS`        | List of domains that are allowed via CORS. Separate multiple domains with `\|`.                                                                                              |          |
| `SSL_PRIVATE_KEY_PATH`       | Path to SSL private key file (for HTTPS).                                                                                                                                   |          |
| `SSL_FULL_CHAIN_PATH`        | Path to SSL full chain certificate file (for HTTPS).                                                                                                                         |          |

> [!NOTE]
> `DISABLE_AUTH` is available but cannot be set to `true` in production. Authentication is always required in production environments.

#### Web App

The web app deploys as a Cloudflare Pages worker via the [GitHub deployment workflows](#deployment). The following variables are required:

| Variable                            | Description                                                                                                                  | Required | Type     |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------- | -------- |
| `API_BASE_URL`                      | URI to the API server.                                                                                                       | ✅       | Variable |
| `API_KEY`                           | API key for access to the API server.                                                                                        | ✅       | Secret   |
| `APP_BASE_URL`                      | URI to the web app.                                                                                                          | ✅       | Variable |
| `AUDIO_BASE_URL`                    | URI for the R2 bucket that hosts the audio files.                                                                            | ✅       | Variable |
| `AUTH0_AUDIENCE`                    | URL for the API created in the Auth0 dashboard.                                                                              | ✅       | Variable |
| `AUTH0_CLIENT_ID`                   | Client ID of the Clearance Lab application in Auth0.                                                                         | ✅       | Variable |
| `AUTH0_CLIENT_SECRET`               | Client-side secret for Auth0.                                                                                                | ✅       | Secret   |
| `AUTH0_DOMAIN`                      | Domain of the Clearance Lab application in Auth0. This is not a URL. Copy the value exactly as shown in the AUTH0 dashboard. | ✅       | Variable |
| `AUTH0_SECRET`                      | Secret for the Clearance Lab application in Auth0.                                                                           | ✅       | Secret   |
| `BACKEND_CF_ACCESS_CLIENT_ID`       | Cloudflare Access client ID for accessing the backend API through Cloudflare Zero Trust.                                     | ✅       | Secret   |
| `BACKEND_CF_ACCESS_CLIENT_SECRET`   | Cloudflare Access client secret for accessing the backend API through Cloudflare Zero Trust.                                 | ✅       | Secret   |
| `CLOUDFLARE_ACCOUNT_ID`             | Cloudflare account ID where the worker is deployed.                                                                          | ✅       | Variable |
| `CLOUDFLARE_API_TOKEN`              | Cloudflare API token for deploying the worker.                                                                               | ✅       | Secret   |
| `CLOUDFLARE_RUNTIME_API_TOKEN`      | API token with `Zone: Cache purge` permission. Used to clear cached audio files programmatically.                            |          | Secret   |
| `CLOUDFLARE_ZONE_ID`                | The Zone ID the worker is deployed under. Used to clear cached audio files programmatically.                                 |          | Variable |
| `DEPLOY_ENV`                        | Deployment environment, either `prod` or `dev`.                                                                              | ✅       | Variable |
| `SAMPLE_SCENARIO_ID`                | MongoDB ID of the sample scenario to display in documentation.                                                               |          | Variable |

> [!NOTE]
> Variables are set in GitHub environment variables for each deployment environment (`dev` and `prod`). Secrets are stored in GitHub secrets.

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

- **Lint**: Builds the monorepo, runs markdown linting with markdownlint, and runs project-specific linting via turbo.
- **PR Label Required**: Requires a label on every pull request for automatic release notes generation.

When manually triggered or when changes are merged to `main` in the `dev` branch workflow:

- **Deploy - dev**: Builds Docker image for the API server, deploys it via Watchtower webhook, and deploys the web app to Cloudflare.

When a release is published:

- **Deploy - prod**: Builds Docker image for the API server with version tag, deploys it via Watchtower webhook, and deploys the web app to Cloudflare production.

All jobs leverage TurboRepo remote caching to speed up builds.

### Deployment

The project uses a two-step deployment process that deploys both the API server (as a Docker container) and the web app (as a Cloudflare Pages worker).

#### Deployment Workflows

Deployments to the `dev` environment are triggered:

- Manually by running the [`Deploy - dev`](.github/workflows/deploy-dev.yaml) workflow in GitHub Actions
- Automatically on pull requests to the `main` branch

Deployments to the `prod` environment are triggered:

- Automatically when a release is published via the [`Deploy - prod`](.github/workflows/deploy-prod.yaml) workflow

#### Deployment Process

Each deployment workflow performs the following steps:

1. **Docker Image Build and Deployment:**
   - Builds a Docker image for the API server
   - Pushes the image to GitHub Container Registry (ghcr.io)
   - Triggers a Watchtower webhook to deploy the container to the production/dev server
   - For dev builds: tags the image as `dev-{short-sha}` and `latest-dev`
   - For prod builds: tags the image with the release tag (e.g., `v1.2.3`) and `latest`

2. **Cloudflare Pages Deployment:**
   - Deploys the web app to Cloudflare Pages
   - Injects all required environment variables and secrets
   - Deploys to the appropriate environment (`dev` or `prod`)

#### Required GitHub Configuration

**For Docker deployment (Watchtower webhook):**

Variables:

- `WATCHTOWER_WEBHOOK_URL`: URL to the Watchtower webhook
- `CF_ACCESS_CLIENT_ID`: Cloudflare Access client ID for authenticating to Watchtower through Cloudflare Zero Trust

Secrets:

- `WATCHTOWER_API_KEY`: API key for the Watchtower webhook
- `CF_ACCESS_CLIENT_SECRET`: Cloudflare Access client secret for authenticating to Watchtower through Cloudflare Zero Trust

**For Cloudflare deployment:**

See the [Web App production environment variables](#web-app) section above for the complete list of required variables and secrets.

**For build optimization:**

Variables:

- `TURBO_TEAM`: Team name for TurboRepo remote caching

Secrets:

- `TURBO_TOKEN`: Token to access TurboRepo remote cache
