import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

import buildGraphqlSchema from "./utils/buildGraphqlSchema";

const schema = buildGraphqlSchema();
const server = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({
        req,
        res
    })
});

const app = express();

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000"
    })
);

app.get("/", (_: any, res: any) => {
    res.send("Hello World");
});

server.applyMiddleware({ app });

export default app;
