# Standup Server (Tentative name)

Standup is a community of makers posting publicly about their projects

## Project Status

Standup is in pre-alpha status and under active development by a [solo developer](@DonnieWest). Most tasks are being tracked outside of this repository for the sake of quick iteration. Once this project reaches an official release, the roadmap will become more public and contributions will be more welcome.

## Developer Setup

You'll need to install the following dependencies first:

- [PostgreSQL](https://postgresapp.com/) 11
- [Yarn](https://yarnpkg.com/en/docs/install) ([latest](https://yarnpkg.com/en/docs/install#mac-stable))
- [Node](https://nodejs.org/en/)

Once Postgres is setup and environment variables are populated (`DATABASE_USER`, `DATABASE_NAME`, `DATABASE_PASSWORD`, `DATABASE_HOST`) run `yarn db:setup` and `yarn db:migrate` to get your database setup. `yarn test` runs your tests and `yarn dev` runs your dev environment
