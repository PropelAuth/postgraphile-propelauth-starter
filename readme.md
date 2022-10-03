# PostGraphile / PropelAuth Multi-Tenant Starter Example

This repo contains three folders:

- **backend** - An Express backend using [PostGraphile](https://www.graphile.org/postgraphile/) to generate instant GraphQL endpoints based on a Postgres schema. Uses [PropelAuth](https://www.propelauth.com/?utm_medium=github&utm_source=postgraphile) and Postgres Row Level Security for multi-tenant / B2B authentication.
- **database** - An example DB schema
- **frontend** - A Next.js (React) application that uses Apollo client to make GraphQL queries and PropelAuth to manage organizations/tenants.

## Getting started

TODO: add blog post

To get started, you'll need to first:

1. Install and run [Postgres](https://www.postgresql.org/download/). You can do this with a native client or with Docker.
2. Hydrate your database. You can either use the example schema in `database/schema.sql` or modify it and use your own.
3. Set up [PropelAuth](https://www.propelauth.com/?utm_medium=github&utm_source=postgraphile) and update `frontend/.env` and `backend/.env` with your `AUTH_URL` and `API_KEY`. See the [Getting started guide](https://docs.propelauth.com/?utm_medium=github&utm_source=postgraphile) for more information.
4. Run the frontend
```shell
$ yarn dev
```
5. Run the backend
```shell
yarn start
```

And that's it. The frontend is alredy set up with an `AuthenticatedApolloProvider` which will automatically include the auth and organization/tenant information on every request. 

## Questions?

Reach out at [support@propelauth.com](mailto:support@propelauth.com)
