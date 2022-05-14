/* eslint-disable prettier/prettier */
import { Connection, createConnection, getConnectionOptions } from "typeorm";

createConnection();

export default async (host = "database"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();
    return createConnection(
        Object.assign(defaultOptions, {
            host,
            database:
                process.env.NODE_ENV === "test"
                    ? "restaurantx_test"
                    : defaultOptions.database,
        })
    );
};
