import { Inject, Injectable } from "@nestjs/common";
import { sql } from "drizzle-orm";
import { FaixaDTO } from "src/application/dto/faixa.dto";
import { QUERY_MANAGER, QueryManager } from "src/application/gateway/query-manager.interface";

@Injectable()
export class GetFaixasQuery {
    constructor(
        @Inject(QUERY_MANAGER)
        private queryManager: QueryManager,
    ) {}

    public async exec(): Promise<FaixaDTO[]> {
        const result = await this.queryManager.execute(sql`
            SELECT A.nr_faixa,A.tp_sentido, A.cd_faixa, A.cd_equipamento, B.nm_sentido_via AS sentido_via_origem, 
            C.nm_sentido_via AS sentido_via_destino FROM opr_faixa AS A
            LEFT JOIN opr_sentido_via AS B ON B.cd_sentido_via = A.cd_sentido_via_origem
            LEFT JOIN opr_sentido_via AS C ON C.cd_sentido_via = A.cd_sentido_via_destino
        `);

        const promiseRows = result.map(async (row) => ({
            tpSentido: (row.tp_sentido as number) ?? null,
            nrFaixa: row.nr_faixa as number,
            cdFaixa: row.cd_faixa as number,
            cdEquipamento: row.cd_equipamento as number,
            sentidoViaDestino: row.sentido_via_destino as string,
            sentidoViaOrigem: row.sentido_via_origem as string,
            dsInfracoes: await this.getInfracoes(row.cd_faixa as number),
        }));

        const rows: FaixaDTO[] = await Promise.all(promiseRows);

        return rows;
    }

    private async getInfracoes(cdFaixa: number): Promise<string[]> {
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
