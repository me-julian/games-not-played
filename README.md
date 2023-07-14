# React App with Identity Access & Management

Mock react app to get a working tech stack set up with auth using Passport.

This branch was my first attempt using Passport with session cookies and
csrf token protection for auth on the client.

This caused issues when trying to test the app due to the app not having
been requested from the express server, initially setting the session
cookie.

This also caused fetch requests in E2E tests to be considered cross
domain, and cookies either weren't being set by the server or weren't
being sent by the client.

As such I decided to abandon this method with the API and client
served by the same Express server. After having also needed to remove
server rendered views for auth pages because of testability issues and
with no apparent easy way to get testing working it no longer had any
advantages.

## Tech Stack

-   [PNPM](https://pnpm.io/) Monorepo
-   [Docker](https://www.docker.com/) and [VS Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)
-   [VS Code Tasks](https://code.visualstudio.com/Docs/editor/tasks) & Bash scripts
-   [Typescript](https://www.typescriptlang.org/)
-   [ReactJS](https://react.dev/) & [React Router](https://reactrouter.com/) with [Vite](https://vitejs.dev/)
-   [Express](https://expressjs.com/) API & Distribution Server
-   MySQL Database with [Sequelize](https://sequelize.org/) using [sequelize-typescript](https://github.com/sequelize/sequelize-typescript)
-   [Passport.js](https://www.passportjs.org/) for email & password authentication
-   [Vitest](https://vitest.dev/) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

## Prerequisites

-   [Docker](https://www.docker.com/)

Linux users should install [Docker Engine, Docker CLI & Docker Compose](https://docs.docker.com/engine/install/).

Windows and macOS users will need [Docker Desktop](https://www.docker.com/products/docker-desktop/).
Windows users should also ensure [WSL2](https://docs.docker.com/desktop/windows/wsl/) is enabled.

More info on ensuring your Docker installation is compatible with VS Code dev containers can be found [here](https://code.visualstudio.com/docs/devcontainers/containers#_getting-started).

## Hosting the app

Will eventually be set up to push images to docker hub for cloud hosting.

## Setting up for development

This project uses [VS Code development containers](https://code.visualstudio.com/docs/devcontainers/containers).

Make sure you've installed the Dev Containers extension by Microsoft in VS Code.

Either: Clone the repository locally and use the `Dev Containers: Open Folder in Container` task.

OR: Use `Dev Containers: Clone Repository in Named Container Volume`. Recommended for Windows or macOS users as it will run much faster.

The database container will automatically start when opening the dev container. Run the `First Time Setup` task to create and migrate the database schemas. [See below](#initial-database-setup) for more info on working with the database.

Run the `Start Server` task in the command palette to start the app and start developing.

Connect to the app on your host machine at _localhost:3000_.

## Working with the database

This project uses database migrations and these must be run to get the database into a usable state.

### Initial database setup

Run the `First Time Setup` task to create the database, build the Typescript models and migrate the database to the latest version. Separated tasks for these actions are also available if needed.

### Migrating the database

If you've made any changes, make sure you run the `Build` task to build your typescript sequelize models to Javascript first.

The `Migrate Database` task will apply your migrations.

### Creating new migrations

You can use the Sequelize CLI to [generate migration scripts and models](https://sequelize.org/docs/v6/other-topics/migrations/#creating-the-first-model-and-migration).

Any models should be manually converted to Typescript (and rebuilt to JS when you're ready to migrate!).

Migration scripts must remain Javascript. CLI generated migrations will also often need manual tweaking to properly match your finalized models.

To see exactly what files are going to be used by the CLI on running migrations you can look at the .sequelizerc file.

## Testing

Use the `Test` task to run automated testing.
