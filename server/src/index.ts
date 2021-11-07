import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import StationResolver from "./controller/StationResolver";

const PORT = 5000;

const main = async () => {
    const connection = await createConnection();
    const app = express();
    const server = new ApolloServer({
        schema: await buildSchema({ resolvers: [StationResolver] }),
    });

    await server.start();
    server.applyMiddleware({ app });

    app.listen(PORT, () => console.log(`live on http://localhost:${PORT}`));
};

main().catch((err) => console.error(err.message));
