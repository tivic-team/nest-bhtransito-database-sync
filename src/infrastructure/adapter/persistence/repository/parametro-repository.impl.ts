import { Inject } from "@nestjs/common";
import { sql } from "drizzle-orm";
import { QUERY_MANAGER, QueryManager } from "src/application/gateway/query-manager.interface";
import {
    IParametroRepository,
    Parametro,
} from "src/application/repository/parametro-repository.interface";

export class ParametroRepositoryImpl implements IParametroRepository {
    constructor(
        @Inject(QUERY_MANAGER)
        private queryManager: QueryManager,
    ) {}
    async getParametros(): Promise<Parametro[]> {
        const result = await this.queryManager.execute(sql`
            SELECT A.nm_parametro, B.vl_parametro FROM opr_parametro AS A
            JOIN opr_parametro_valor AS B ON B.cd_parametro = A.cd_parametro
        `);

        return result.map((row) => ({
            nmParametro: row.nm_parametro as string,
            vlParametro: row.vl_parametro as string,
        }));
    }
}
