require('dotenv').config()
const express = require("express");
const {postgraphile} = require("postgraphile");
const PgSimplifyInflectorPlugin = require("@graphile-contrib/pg-simplify-inflector");
const {requireOrgMember} = require("./propelauth")
const cors = require("cors")

const app = express();

app.use(cors({origin: process.env.FRONTEND_BASE_URL}))

// Auth middleware that verifies the request's access token
//   and checks that user is in the organization
//   they specified in the query (req.query.orgId)
const propelAuthMiddleware = requireOrgMember({
    orgIdExtractor: req => req.headers["x-org-id"]
})

const postgraphileMiddleware = postgraphile(
    process.env.DATABASE_URL,
    "public",
    {
        appendPlugins: [PgSimplifyInflectorPlugin],
        pgSettings: async req => ({
            'role': `member`,
            'propelauth.user_id': `${req.user.userId}`,
            'propelauth.org_id': `${req.org.orgId}`,
        }),
    }
);

app.use(propelAuthMiddleware, postgraphileMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`)
})
