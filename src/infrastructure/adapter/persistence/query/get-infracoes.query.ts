import { Inject, Injectable } from "@nestjs/common";
import { sql } from "drizzle-orm";
import { QUERY_MANAGER, QueryManager } from "src/application/gateway/query-manager.interface";

@Injectable()
export class GetInfracoesQuery {
    constructor(
        @Inject(QUERY_MANAGER)
        private queryManager: QueryManager,
    ) {}

    async exec(cdFaixa: number): Promise<string[]> {
        const result = await this.queryManager.execute(sql`
            SELECT E.ds_infracao FROM opr_faixa AS A
            LEFT JOIN opr_faixa_infracao AS D ON D.cd_faixa = A.cd_faixa
            LEFT JOIN opr_infracao AS E ON E.cd_infracao = D.cd_infracao
            WHERE A.cd_faixa = ${cdFaixa}
        `);

        const rows: string[] = result.map((row) => row.ds_infracao as string);
        return rows;
    }
}
