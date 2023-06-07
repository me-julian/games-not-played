# React App with Identity Access & Management

Mock react app to get a working tech stack set up with auth using Passport.

## Tech Stack

-   PNPM Monorepo
-   Docker and VS Code Dev Containers
-   VS Code Tasks & Bash scripts
-   Typescript
-   React.js & React Router with Vite
-   API & Distribution Server with Express
-   MySQL Database with Sequelize
-   [Passport.js](https://www.passportjs.org/) for email & password authentication

## Prerequisites

- [Docker](https://www.docker.com/)

Linux users should install [Docker Engine, Docker CLI & Docker Compose](https://docs.docker.com/engine/install/).

Windows and macOS users will need [Docker Desktop](https://www.docker.com/products/docker-desktop/).
Windows users should also ensure [WSL2](https://docs.docker.com/desktop/windows/wsl/) is enabled.


## Hosting the app

Will eventually be set up to push images to docker hub for cloud hosting.

## Setting up for development

This project uses [VS Code development containers](https://code.visualstudio.com/docs/devcontainers/containers).

Make sure you've installed the Dev Containers extension by Microsoft in VS Code.

Either clone the repository locally and use the `Dev Containers: Open Folder in Container` task

OR use `Dev Containers: Clone Repository in Named Container Volume`. Recommended for Windows users using WSL as it will run much faster.

The database container will automatically start when opening the dev container. Run the `First Time Setup` task to create and migrate the database schemas. [See below](#initial-database-setup) for more info on working with the database.

Run the `Start Server` task in the command palette to start the app and start developing.

Connect to the app on your host machine at *localhost:3000*.

## Working with the database

This project uses database migrations and these must be run to get the database into a usable state.

### Initial database setup

**Needs a better solution --** You must **edit the LOCAL_DATABASE_PATH variable** in the .devcontainer folder's .env file with your preferred location for MySQL data on your system. This should be a dedicated, empty directory. Editing this variable will require you to rebuild the container.

Run the `First Time Setup` task to create the database, build the Typescript models and migrate the database to the latest version. Separated tasks for these actions are also available if needed.

### Migrating the database

If you've made any changes, make sure you run the `Build` task to build your typescript sequelize models to Javascript first.

The `Migrate Database` task will apply your migrations.

### Creating new migrations

You can use the Sequelize CLI to generate migration scripts and models.

Any models should be manually converted to Typescript (and rebuilt to JS when you're ready to migrate!).

Migration scripts must remain Javascript. CLI generated migrations will also often need manual tweaking to properly match your finalized models.

To see exactly what files are going to be used by the CLI on running migrations you can look at the .sequelizerc file.
