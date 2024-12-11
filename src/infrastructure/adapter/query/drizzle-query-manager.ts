import { QueryManager } from "src/application/gateway/query-manager.interface";
import { Drizzle } from "../../config/database/db";
import { SQL } from "drizzle-orm";

export class DrizzleQueryManager implements QueryManager {
    public readonly db = Drizzle.getDatabase();

    async execute<T>(query: string | SQL<unknown>): Promise<T> {
        const { rows } = await this.db.execute(query);
        return rows as unknown as T;
    }
}
