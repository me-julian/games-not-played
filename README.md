# React App with Identity Access & Management

Mock react app to get a working tech stack set up with auth using Passport.

## Tech Stack

-   PNPM Monorepo
-   Docker for development and deployment
-   Bash scripts
-   Typescript
-   React.js & React Router with Vite
-   API & Distribution Server with Express
-   MySQL Database with Sequelize
-   [Passport.js](https://www.passportjs.org/) for email & password authentication

## Prerequisites

Make sure you've installed:

-   [PNPM](https://pnpm.io/)
-   [Docker Desktop](https://www.docker.com/products/docker-desktop/) or Docker Engine, Docker CLI & Docker Compose
-   [MySQL](https://www.mysql.com/) (if not using Docker containers exclusively)

## Hosting the app

Will eventually be set up to push images to docker hub for cloud hosting.

As it is, [look below](#setting-up-the-repo-for-development) on installing with dev dependencies. Then make sure you've [created and migrated the production database](#initial-setup-and-updating-database-version).

Run `bash scripts/build.sh` to build the server and client files for production.

Then either:

Run `bash scripts/start-prod.sh` to run the app locally in production mode.

Run `docker compose build` and `docker compose up` in the root directory to build and run the app in Docker containers.

## Setting up for development

After cloning the repo, make sure you have PNPM installed. Run `pnpm install` in the root directory to install the dependencies for the whole project.

[See below](#initial-setup-and-updating-database-version) to get the database setup.

Run `bash scripts/start-dev.sh` to start the app using the source files with hot reloading.

## Working with the database

This project uses database migrations and these must be run to get the database in a usable state.

### Initial setup and updating database version

For first time initialization make sure you've installed dev dependencies as you need access to the Sequelize CLI and Typescript compiler. Run `bash scripts/create-dbs.sh` to create a production and development database.

The development database will use your local machine's MySQL server.
The production database is also currently just a local database used as a volume by Docker.

In order to run existing migrations you must use `bash scripts/build.sh` to build the typescript sequelize models to Javascript first.

Then, on running `pnpm run migrate-prod-db` or `pnpm run migrate-dev-db` you can apply the migrations to their respective databases separately.

### Creating new migrations

You can use the Sequelize CLI to generate the migration scripts and models. Then you'll have to convert any new models generated to Typescript. Migration scripts must remain Javascript.

To see exactly what files are going to be used by the CLI on running migrations you can look at the .sequelizerc file.
