import { Inject, Injectable } from "@nestjs/common";
import { sql } from "drizzle-orm";
import { DeteccaoMidiaDTO } from "src/application/dto/deteccao-midia.dto";
import { QUERY_MANAGER, QueryManager } from "src/application/gateway/query-manager.interface";

@Injectable()
export class GetDeteccoesMidiaQuery {
    constructor(
        @Inject(QUERY_MANAGER)
        private queryManager: QueryManager,
    ) {}

    public async exec(): Promise<DeteccaoMidiaDTO[]> {
        const result = await this.queryManager.execute(sql`
            SELECT DISTINCT c.cd_equipamento, b.dt_deteccao
            FROM opr_deteccao_midia AS a
            JOIN opr_deteccao_infracao AS b ON b.cd_deteccao_infracao = a.cd_deteccao
            JOIN opr_equipamento AS c ON c.cd_equipamento = b.cd_equipamento
            WHERE b.dt_deteccao >= CURRENT_DATE - INTERVAL '5 days';
        `);

        const rows: DeteccaoMidiaDTO[] = result.map((row) => ({
            cdEquipamento: row.cd_equipamento as number,
            dtDeteccao: row.dt_deteccao as string,
        }));

        return rows;
    }
}
