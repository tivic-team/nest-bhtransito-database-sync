import { Inject, Injectable, Logger } from "@nestjs/common";
import { environment } from "../config/environments/env";
import { Cron } from "@nestjs/schedule";
import { GetEquipamentoFullDataQuery } from "../../application/query/get-equipamento-full-data.query";
import {
    CACHE_STORAGE_REPOSITORY,
    ICacheStorageRepository,
} from "src/application/repository/cache-repository.interface";
import {
    IParametroRepository,
    PARAMETRO_REPOSITORY,
} from "src/application/repository/parametro-repository.interface";

@Injectable()
export class SynchronizeService {
    private readonly logger = new Logger(SynchronizeService.name);

    constructor(
        private readonly getEquipamentoFullDataQuery: GetEquipamentoFullDataQuery,
        @Inject(CACHE_STORAGE_REPOSITORY)
        private readonly cacheStorageRepository: ICacheStorageRepository,

        @Inject(PARAMETRO_REPOSITORY)
        private readonly parametroRepository: IParametroRepository,
    ) {}

    @Cron(environment.cronExpression)
    async synchronize() {
        try {
            await this.syncEquipamentos();
            await this.syncParametros();
            this.logger.log(`✅ Dados sincronizados com sucesso!`);
        } catch (error) {
            this.logger.error(`❌ Erro ao sincronizar dados: ${error.message}`);
        }
    }

    private async syncEquipamentos() {
        const dadosEquipamentos = await this.getEquipamentoFullDataQuery.execute();

        dadosEquipamentos.forEach((equipamento) => {
            const { idEquipamento, ...data } = equipamento;
            this.cacheStorageRepository.setValue(String(idEquipamento), JSON.stringify(data));
        });
    }

    private async syncParametros() {
        const parametros = await this.parametroRepository.getParametros();

        parametros.forEach((parametro) => {
            this.cacheStorageRepository.setValue(parametro.nmParametro, parametro.vlParametro);
        });
    }
}
