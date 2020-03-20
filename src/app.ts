import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
const connectRedis = require("connect-redis");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

import buildGraphqlSchema from "./utils/buildGraphqlSchema";
import { redis } from "./redis";

let sessionStore: any;

if (process.env.NODE_ENV === "test") {
    sessionStore = new session.MemoryStore();
} else {
    const SessionRedisStore = connectRedis(session);
    sessionStore = new SessionRedisStore({
        client: redis as any
    });
}


const schema = buildGraphqlSchema();
const server = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({
        req,
        res,
        sessionStore
    }),
    introspection: true,
    playground: true,
});

const app = express();

// app.use(
//     cors({
//         credentials: true,
//         origin: "http://localhost:3000"
//     })
// )

app.use(
    session({
        store: sessionStore,
        name: "bid",
        secret: "SESSION",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            // secure: process.env.NODE_ENV === "production", TODO: uncomment this when we get https
            maxAge: 1000 * 60 * 20 // 20 mins
            // maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
        }
    })
);

app.get("/", (_: any, res: any) => {
    res.send("Hello World");
});


server.applyMiddleware({ app, cors: { origin: process.env.FRONTEND_URL, credentials: true } });

export default app;
