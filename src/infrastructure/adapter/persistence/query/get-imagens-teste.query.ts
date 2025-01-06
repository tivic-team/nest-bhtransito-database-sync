import { Inject, Injectable } from "@nestjs/common";
import { sql } from "drizzle-orm";
import { ImagemTesteDTO } from "src/application/dto/imagem-teste.dto";
import { QUERY_MANAGER, QueryManager } from "src/application/gateway/query-manager.interface";

@Injectable()
export class GetImagensTesteQuery {
    constructor(
        @Inject(QUERY_MANAGER)
        private queryManager: QueryManager,
    ) {}

    async exec(): Promise<ImagemTesteDTO[]> {
        const result = await this.queryManager.execute(sql`
            SELECT distinct a.dt_hora, b.cd_faixa
            FROM opr_imagem_teste AS a
            JOIN opr_lote_deteccao AS b ON b.cd_lote_deteccao = a.cd_lote_deteccao
            JOIN opr_faixa AS c ON c.cd_faixa = b.cd_faixa
            WHERE a.dt_hora >= CURRENT_DATE - INTERVAL '5 days';
        `);

        const rows: ImagemTesteDTO[] = result.map((row) => ({
            dtHora: row.dt_hora,
            cdFaixa: row.cd_faixa,
        }));
        return rows;
    }
}
