import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { environment } from "../environments/env";
const { databaseHost, databaseName, databasePassword, databasePort, databaseUsername } =
    environment;
const url = `postgresql://${databaseUsername}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}`;
const db = drizzle(url);

export class Drizzle {
    public static getDatabase() {
        return db;
    }
}
