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

As it is, [look below](#setting-up-for-development) on installing with dev dependencies. Then make sure you've [created and migrated the production database](#initial-database-setup).

Run `bash scripts/build.sh` to build the server and client files for production.

Then either:

Run `bash scripts/start-prod.sh` to run the app locally in production mode.

Run `docker compose build` and `docker compose up` in the root directory to build and run the app in Docker containers.

## Setting up for development

After cloning the repo, make sure you have PNPM installed. Run `pnpm install` in the root directory to install the dependencies for the whole project.

[See below](#initial-database-setup) to get the database set up.

Run `bash scripts/start-dev.sh` to run the app using the source files with hot reloading.

## Working with the database

This project uses database migrations and these must be run to get the database in a usable state.

### Initial database setup

For first time initialization make sure you've installed dev dependencies as you need access to the Sequelize CLI and Typescript compiler.

You must **edit the LOCAL_DATABASE_PATH variable** in the root's .env file with your preferred location for MySQL data on your system. It's recommended that this is a dedicated, empty directory as Sequelize will generate a large number of files in the location.

This directory will be used as a storage volume for Docker containers in development **and** production.

Run `bash scripts/start-dev.sh` to build and start up a Docker dev container.

You can CTRL+C to exit the server process in the container. Use `docker ps` to get the container id and re-enter its terminal with `docker exec -it <container id> /bin/sh`.

Now run `sh scripts/create-dbs.sh` in the container to create the databases in the location you specified.

Now you must run migrations.

<!--
    If running the docker compose up command with the bash scripts, without any existing containers for the images, it will hang on creating the db.
    It works if running the same command manually in the terminal and then running the script after (containers have already been creating and started once).

    But then the db was dying immediately. Apparently the data got corrupted?

    I cleared the test database directory and started the docker compose project again. It rebuilt the database and seemed fine.

    Then, after docker compose down-ing (not kill), I tried to start up again and it hung on creating the db once again.

    I tried twice, having to CTRL+C both times. Used the command outside the bash script again, it worked. Then downed fully and upped with bash, it hung.

    Conclusion: Bash script is unable to start up the containers. It only works if they're already up as daemon and the bash script just recreates them.

    Earlier attempt also had weird issues with the app not running properly after migrating db.
 -->

### Migrating the database

Always run migrations from within a Docker (development) container.

If you've made any changes, make sure you've run `sh scripts/build.sh` to build your typescript sequelize models to Javascript first.

Then, on running `pnpm run migrate-prod-db` or `pnpm run migrate-dev-db` you can apply the migrations to their respective databases separately.

### Creating new migrations

You can use the Sequelize CLI to generate migration scripts and models.

Any models should be manually converted to Typescript (and rebuilt to JS when you're ready to migrate!).

Migration scripts must remain Javascript. CLI generated migrations will also often need manual tweaking to properly match your finalized models.

To see exactly what files are going to be used by the CLI on running migrations you can look at the .sequelizerc file.
