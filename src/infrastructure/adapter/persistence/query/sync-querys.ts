import { Injectable } from "@nestjs/common";
import { EquipamentoDTO } from "src/application/dto/equipamento.dto";
import { GetEquipamentoQuery } from "./get-equipamentos.query";
import { GetFaixasQuery } from "./get-faixas.query";

@Injectable()
export class SyncQuerys {
    constructor(
        private getEquipamentoQuery: GetEquipamentoQuery,
        private getFaixas: GetFaixasQuery,
    ) {}

    async execute(): Promise<EquipamentoDTO[]> {
        const equipamentos = await this.getEquipamentoQuery.exec();
        const faixas = await this.getFaixas.exec();

        const output: EquipamentoDTO[] = equipamentos.map((equipamento) => {
            const equipamentoFaixas = faixas.filter((faixa) => {
                if (faixa.cdEquipamento === equipamento.cdEquipamento) {
                    delete faixa.cdEquipamento;
                    return faixa;
                }
            });

            equipamento.faixas = equipamentoFaixas;
            return equipamento;
        });
        return output;
    }
}
