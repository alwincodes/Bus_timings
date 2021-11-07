import "reflect-metadata";
import { createConnection } from "typeorm";

const main = async () => {
    const connection = await createConnection();
};

main().catch((err) => console.error(err.message));
