## Database

We'd recommmend using a tool to manage your schema, like dbmate or Prisma. To avoid being opinionated here, we just left the schema file.

You can run it like so:

```shell
$ psql "postgres://postgres:postgres@127.0.0.1:5432/postgres?sslmode=disable" -f database/initial_schema.sql
```
