import { defineConfig, Config } from "drizzle-kit";
import { environment } from "src/infrastructure/environments/env";

export const databaseConfig: Config = {
    out: "./drizzle",
    schema: "./src/database/schema.drizzle.ts",
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
