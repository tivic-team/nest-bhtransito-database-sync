import { Inject, Injectable } from "@nestjs/common";
import { sql } from "drizzle-orm";
import { EquipamentoDTO } from "src/application/dto/equipamento.dto";
import { FaixaDTO } from "src/application/dto/faixa.dto";
import { QUERY_MANAGER, QueryManager } from "src/application/gateway/query-manager.interface";

@Injectable()
export class GetEquipamentoFullDataQuery {
    constructor(
        @Inject(QUERY_MANAGER)
        private queryManager: QueryManager,
    ) {}

    async execute(): Promise<EquipamentoDTO[]> {
        const equipamentos = await this.getEquipamentos();
        const faixas = await this.getFaixas();

        const output: EquipamentoDTO[] = equipamentos.map((equipamento) => {
            const equipamentoFaixas = faixas.filter((faixa) => {
                if (faixa.cdEquipamento === equipamento.cdEquipamento) {
                    delete faixa.cdEquipamento;
                    return faixa;
                }
            });
            return {
                ...equipamento,
                faixas: equipamentoFaixas.map((faixa) => ({
                    ...faixa,
                    cdEquipamento: undefined,
                })),
            };
        });
        return output;
    }

    private async getFaixas(): Promise<FaixaDTO[]> {
        const result = await this.queryManager.execute(sql`
            SELECT A.nr_faixa, A.cd_faixa, A.cd_equipamento, B.nm_sentido_via AS sentido_via_origem, 
            C.nm_sentido_via AS sentido_via_destino FROM opr_faixa AS A
            JOIN opr_sentido_via AS B ON B.cd_sentido_via = A.cd_sentido_via_origem
            JOIN opr_sentido_via AS C ON C.cd_sentido_via = A.cd_sentido_via_destino
        `);

        const rows: FaixaDTO[] = result.map((row) => ({
            nrFaixa: row.nr_faixa as number,
            cdFaixa: row.cd_faixa as number,
            cdEquipamento: row.cd_equipamento as number,
            sentidoViaDestino: row.sentido_via_destino as string,
            sentidoViaOrigem: row.sentido_via_origem as string,
        }));

        return rows;
    }

    private async getEquipamentos(): Promise<EquipamentoDTO[]> {
        const result = await this.queryManager.execute(sql`
            SELECT A.id_equipamento, A.cd_equipamento, 
		        A.lg_metrologico, A.nr_serie, B.qt_tempo_retardo
            FROM opr_equipamento as A
            JOIN opr_equipamento_registro_objeto as B ON B.cd_equipamento = A.cd_equipamento
        `);
        const rows: EquipamentoDTO[] = result.map((row) => ({
            qtTempoRetardo: row.qt_tempo_retardo as number,
            idEquipamento: row.id_equipamento as string,
            cdEquipamento: row.cd_equipamento as number,
            lgMetrologico: row.lg_metrologico as number,
            nrSerie: row.nr_serie as string,
        }));

        return rows;
    }
}
