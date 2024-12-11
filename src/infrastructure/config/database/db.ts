import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { environment } from "../environments/env";
import { Pool } from "pg";
const { databaseHost, databaseName, databasePassword, databasePort, databaseUsername } =
    environment;
const connectionString = `postgresql://${databaseUsername}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}`;
const pool = new Pool({
    connectionString,
});
const db = drizzle(pool);

export class Drizzle {
    public static getDatabase() {
        return db;
    }
}
