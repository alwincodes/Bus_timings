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
                async requestDidStart(requestContext) {
                    return {
                        didResolveOperation: async ({ request, document }) => {
                            const complexity = getComplexity({
                                // Our built schema
                                schema: gqlSchema,
                                // To calculate query complexity properly,
                                // we have to check only the requested operation
                                // not the whole document that may contains multiple operations
                                operationName: request.operationName,
                                // The GraphQL query document
                                query: document,
                                // The variables for our GraphQL query
                                variables: request.variables,
                                // Add any number of estimators. The estimators are invoked in order, the first
                                // numeric value that is being returned by an estimator is used as the field complexity.
                                // If no estimator returns a value, an exception is raised.
                                estimators: [
                                    // Using fieldExtensionsEstimator is mandatory to make it work with type-graphql.
                                    fieldExtensionsEstimator(),
                                    // Add more estimators here...
                                    // This will assign each field a complexity of 1
                                    // if no other estimator returned a value.
                                    simpleEstimator({ defaultComplexity: 1 }),
                                ],
                            });
                            // Here we can react to the calculated complexity,
                            // like compare it with max and throw error when the threshold is reached.
                            if (complexity > 15) {
                                throw new Error(
                                    `Sorry, too complicated query! ${complexity} is over 20 that is the max allowed complexity.`
                                );
                            }
                            // And here we can e.g. subtract the complexity point from hourly API calls limit.
                            console.log(
                                "Used query complexity points:",
                                complexity
                            );
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
