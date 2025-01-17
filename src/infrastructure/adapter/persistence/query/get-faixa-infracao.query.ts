import { Inject, Injectable } from "@nestjs/common";
import { sql } from "drizzle-orm";
import { QUERY_MANAGER, QueryManager } from "src/application/gateway/query-manager.interface";
import { InfracaoDTO } from "src/application/dto/faixa-infracao.dto";

@Injectable()
export class GetFaixasInfracoesQuery {
    constructor(
        @Inject(QUERY_MANAGER)
        private queryManager: QueryManager,
    ) {}

    async exec(): Promise<InfracaoDTO[]> {
        const result = await this.queryManager.execute(sql`
            SELECT E.cd_infracao, A.cd_faixa FROM opr_faixa AS A
            LEFT JOIN opr_faixa_infracao AS D ON D.cd_faixa = A.cd_faixa
            LEFT JOIN opr_infracao AS E ON E.cd_infracao = D.cd_infracao
        `);

        return result.map((row) => ({
            cdInfracao: row.cd_infracao as number,
            cdFaixa: row.cd_faixa as number,
        }));
    }
}
