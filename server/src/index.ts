import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import StationResolver from "./controller/StationResolver";
import { createConnection } from "typeorm";

const PORT = 5000;

const main = async () => {
    await createConnection();
    const app = express();
    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [StationResolver],
            validate: false,
        }),
    });

    await server.start();
    server.applyMiddleware({ app });

    app.listen(PORT, () => console.log(`live on http://localhost:${PORT}`));
};

main().catch((err) => console.error(err.message));
