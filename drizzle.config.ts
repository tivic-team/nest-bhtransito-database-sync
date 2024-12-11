import { defineConfig, Config } from "drizzle-kit";
import { environment } from "src/infrastructure/config/environments/env";

export const databaseConfig: Config = {
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        host: environment.databaseHost,
        user: environment.databaseUsername,
        password: environment.databasePassword,
        database: environment.databaseName,
        port: environment.databasePort,
        ssl: false,
    },
};

export default defineConfig(databaseConfig);
