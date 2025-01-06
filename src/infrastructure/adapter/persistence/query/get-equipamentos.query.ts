import { Inject, Injectable } from "@nestjs/common";
import { sql } from "drizzle-orm";
import { EquipamentoDTO } from "src/application/dto/equipamento.dto";
import { QUERY_MANAGER, QueryManager } from "src/application/gateway/query-manager.interface";

@Injectable()
export class GetEquipamentoQuery {
    constructor(
        @Inject(QUERY_MANAGER)
        private queryManager: QueryManager,
    ) {}

    public async exec(): Promise<EquipamentoDTO[]> {
        const result = await this.queryManager.execute(sql`
            SELECT A.id_equipamento, A.cd_equipamento, C.vl_limite,
            A.lg_metrologico, A.nr_serie, B.qt_tempo_retardo
            FROM opr_equipamento as A
            LEFT JOIN opr_equipamento_registro_objeto as B ON B.cd_equipamento = A.cd_equipamento
            LEFT JOIN opr_equipamento_afericao as C ON C.cd_equipamento = A.cd_equipamento
        `);
        const rows: EquipamentoDTO[] = result.map((row) => ({
            vlLimite: row.vl_limite,
            qtTempoRetardo: row.qt_tempo_retardo,
            idEquipamento: row.id_equipamento as string,
            cdEquipamento: row.cd_equipamento as number,
            lgMetrologico: row.lg_metrologico as number,
            nrSerie: row.nr_serie as string,
        }));

        return rows;
    }
}
