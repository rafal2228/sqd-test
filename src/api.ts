import SimplifyInflectorPlugin from "@graphile-contrib/pg-simplify-inflector";
import express from "express";
import { NodePlugin } from "graphile-build";
import { postgraphile } from "postgraphile";
import FilterPlugin from "postgraphile-plugin-connection-filter";
import { z } from "zod";

const app = express();

const env = z
  .object({
    DB_HOST: z.string().optional().default("localhost"),
    DB_PORT: z.coerce.number().int().optional().default(23798),
    DB_NAME: z.string().optional().default("squid"),
    DB_USER: z.string().optional().default("postgres"),
    DB_PASS: z.string().optional().default("postgres"),
    GRAPHQL_SERVER_BASE_PATH: z.string().optional(),
    GRAPHQL_SERVER_PORT: z.coerce.number().int().optional().default(8080),
  })
  .parse(process.env);

app.use(
  postgraphile(
    {
      host: env.DB_HOST,
      port: env.DB_PORT,
      database: env.DB_NAME,
      user: env.DB_USER,
      password: env.DB_PASS,
    },
    "public",
    {
      graphiql: true,
      enhanceGraphiql: true,
      dynamicJson: false,
      disableDefaultMutations: true,
      disableQueryLog: true,
      skipPlugins: [NodePlugin],
      appendPlugins: [FilterPlugin, SimplifyInflectorPlugin],
      externalGraphqlRoute: env.GRAPHQL_SERVER_BASE_PATH ? env.GRAPHQL_SERVER_BASE_PATH + "/api/graphql" : undefined,
      graphileBuildOptions: {
        connectionFilterAllowedFieldTypes: ["String"],
        connectionFilterComputedColumns: false,
        connectionFilterAllowedOperators: ["inInsensitive"],
      },
    },
  ),
);

app.listen(env.GRAPHQL_SERVER_PORT, () => {
  console.log(`Squid API listening on port ${env.GRAPHQL_SERVER_PORT}`);
});
