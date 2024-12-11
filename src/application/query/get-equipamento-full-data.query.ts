import { Inject, Injectable } from "@nestjs/common";
import { sql } from "drizzle-orm";
import { Drizzle } from "src/infrastructure/config/database/db";
import { QUERY_MANAGER, QueryManager } from "../gateway/query-manager.interface";

interface Equipamento {
    idEquipamento: string;
    cdEquipamento: number;
    lgMetrologico: number;
    nrSerie: string;
}
interface Faixa {
    nrFaixa: number;
    cdEquipamento: number;
}
interface Output extends Equipamento {
    nrFaixas: number[];
}

@Injectable()
export class GetEquipamentoFullDataQuery {
    constructor(
        @Inject(QUERY_MANAGER)
        private queryManager: QueryManager,
    ) {}

    async execute(): Promise<Output[]> {
        const equipamentos = await this.getEquipamentos();
        const faixas = await this.getFaixas();

        const output: Output[] = equipamentos.map((equipamento) => {
            const equipamentoFaixas = faixas.filter((faixa) => {
                if (faixa.cdEquipamento === equipamento.cdEquipamento) {
                    delete faixa.cdEquipamento;
                    return faixa;
                }
            });
            return { ...equipamento, nrFaixas: equipamentoFaixas.map((faixa) => faixa.nrFaixa) };
        });
        return output;
    }

    private async getFaixas(): Promise<Faixa[]> {
        const result = await this.queryManager.execute(sql`
            SELECT nr_faixa, cd_equipamento
            FROM opr_faixa
        `);

        const rows: Faixa[] = result.map((row) => ({
            nrFaixa: row.nr_faixa as number,
            cdEquipamento: row.cd_equipamento as number,
        }));

        return rows;
    }

    private async getEquipamentos(): Promise<Equipamento[]> {
        const result = await this.queryManager.execute(sql`
            SELECT id_equipamento, cd_equipamento, lg_metrologico, nr_serie 
            FROM opr_equipamento
        `);
        const rows: Equipamento[] = result.map((row) => ({
            idEquipamento: row.id_equipamento as string,
            cdEquipamento: row.cd_equipamento as number,
            lgMetrologico: row.lg_metrologico as number,
            nrSerie: row.nr_serie as string,
        }));

        return rows;
    }
}
