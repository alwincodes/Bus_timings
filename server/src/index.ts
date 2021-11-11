import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import StationResolver from "./controller/StationResolver";
import { createConnection } from "typeorm";
import Redis from "ioredis";
import BusResolver from "./controller/BusResolver";
import BusToStationResolver from "./controller/BusToStationResolver";
import {
    getComplexity,
    simpleEstimator,
    fieldExtensionsEstimator,
} from "graphql-query-complexity";

const PORT = 5000;

const main = async () => {
    //mysql connection
    await createConnection();
    //redis connection
    const redisClient = new Redis();

    const app = express();
    const gqlSchema = await buildSchema({
        resolvers: [StationResolver, BusResolver, BusToStationResolver],
        validate: false,
    });
    const server = new ApolloServer({
        schema: gqlSchema,
        context: ({ req, res }) => ({ req, res, redisClient }),
        plugins: [
            {
                async requestDidStart() {
                    return {
                        didResolveOperation: async ({ request, document }) => {
                            const complexity = getComplexity({
                                schema: gqlSchema,
                                operationName: request.operationName,
                                query: document,
                                variables: request.variables,
                                estimators: [
                                    fieldExtensionsEstimator(),
                                    simpleEstimator({ defaultComplexity: 1 }),
                                ],
                            });
                            console.log(
                                "Used query complexity points:",
                                complexity
                            );
                            if (complexity > 15) {
                                throw new Error(
                                    `Sorry, too complicated query! ${complexity} is over 15 that is the max allowed complexity.`
                                );
                            }
                        },
                    };
                },
            },
        ],
    });

    await server.start();
    server.applyMiddleware({ app });

    app.listen(PORT, () => console.log(`live on http://localhost:${PORT}`));
};

main().catch((err) => console.error(err.message));
