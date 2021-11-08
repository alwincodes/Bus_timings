import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import StationResolver from "./controller/StationResolver";
import { createConnection } from "typeorm";
import Redis from "ioredis";
import BusResolver from "./controller/BusResolver";
import BusToStationResolver from "./controller/BusToStationResolver";

const PORT = 5000;

const main = async () => {
    //mysql connection
    await createConnection();
    //redis connection
    const redisClient = new Redis();

    const app = express();
    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [StationResolver, BusResolver, BusToStationResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, redisClient }),
    });

    await server.start();
    server.applyMiddleware({ app });

    app.listen(PORT, () => console.log(`live on http://localhost:${PORT}`));
};

main().catch((err) => console.error(err.message));
