import { SQL } from "drizzle-orm";

export interface QueryManager {
    execute<T>(query: string | SQL<unknown>): Promise<any[]>;
}

export const QUERY_MANAGER = "QueryManager-1";
