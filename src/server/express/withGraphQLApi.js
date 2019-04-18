import express from "express";
import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import { prepare } from "@gramps/gramps";
import { HttpLink } from "apollo-link-http";
import {
  introspectSchema,
  makeRemoteExecutableSchema,
  mergeSchemas
} from "graphql-tools";
import fetch from "node-fetch";
import fetchCookie from "fetch-cookie";

export default async modules => {
  const router = express.Router();

  // We are merging schemas manually since GrAMPS does not
  // support remote schemas yet
  // see https://github.com/gramps-graphql/gramps/issues/47
  const GraphQLOptions = prepare({ dataSources: modules });
  GraphQLOptions.schema = mergeSchemas({
    schemas: [
      await remoteAdaptCommerce(),
      GraphQLOptions.schema
    ].filter(Boolean)
  });
  const server = new ApolloServer({ ...GraphQLOptions, playground: true });

  router.use(bodyParser.json());
  server.applyMiddleware({ app: router });

  return router;
};

async function remoteAdaptCommerce() {
  if (process.env.FEATURE_DEMO_REMOTE_SCHEMA_STITCHING_DISABLE) {
    return;
  }
  const link = new HttpLink({
    uri: "https://demo.adaptcommerce.com/graphql",
    // to persist session between refreshes you can inject a custom cookie jar
    // as a second parameter below. See https://github.com/valeriangalliat/fetch-cookie#usage
    fetch: fetchCookie(fetch)
  });

  return makeRemoteExecutableSchema({
    schema: await introspectSchema(link),
    link
  });
}
