import { Injectable } from "@nestjs/common";
import { EquipamentoDTO } from "src/application/dto/equipamento.dto";
import { GetDeteccoesMidiaQuery } from "../get-deteccoes-midia.query";
import { GetEquipamentoQuery } from "../get-equipamentos.query";
import { GetFaixasQuery } from "../get-faixas.query";
import { FaixaDTO } from "src/application/dto/faixa.dto";
import { DeteccaoMidiaDTO } from "src/application/dto/deteccao-midia.dto";

@Injectable()
export class SyncQuerys {
    constructor(
        private getEquipamentoQuery: GetEquipamentoQuery,
        private getFaixas: GetFaixasQuery,
        private getDeteccoesMidia: GetDeteccoesMidiaQuery,
    ) {}

    async execute(): Promise<EquipamentoDTO[]> {
        const equipamentos = await this.getEquipamentoQuery.exec();
        const faixas = await this.getFaixas.exec();
        const deteccoesMidia = await this.getDeteccoesMidia.exec();
        const output: EquipamentoDTO[] = equipamentos.map((equipamento) => ({
            ...equipamento,
            deteccoesMidia: this.extractDeteccoesMidia(deteccoesMidia, equipamento),
            faixas: this.extractFaixas(faixas, equipamento),
        }));

        return output;
    }

    private extractFaixas(faixas: FaixaDTO[], equipamento: EquipamentoDTO) {
        return faixas.filter((faixa) => {
            if (faixa.cdEquipamento === equipamento.cdEquipamento) {
                delete faixa.cdEquipamento;
                return faixa;
            }
        });
    }

    private extractDeteccoesMidia(deteccoesMidia: DeteccaoMidiaDTO[], equipamento: EquipamentoDTO) {
        return deteccoesMidia.filter((deteccaoMidia) => {
            if (deteccaoMidia.cdEquipamento === equipamento.cdEquipamento) {
                delete deteccaoMidia.cdEquipamento;
                return deteccaoMidia;
            }
        });
    }
}
