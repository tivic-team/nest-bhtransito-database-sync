import { Inject, Injectable, Logger } from "@nestjs/common";
import * as moment from "moment";
import { environment } from "../config/environments/env";
import { Cron } from "@nestjs/schedule";
import { GetEquipamentoFullDataQuery } from "../../application/query/get-equipamento-full-data.query";
import {
    CACHE_STORAGE_REPOSITORY,
    ICacheStorageRepository,
} from "src/application/repository/cache-repository.interface";

@Injectable()
export class SynchronizeService {
    private readonly logger = new Logger(SynchronizeService.name);

    constructor(
        private readonly getEquipamentoFullDataQuery: GetEquipamentoFullDataQuery,
        @Inject(CACHE_STORAGE_REPOSITORY)
        private readonly cacheStorageRepository: ICacheStorageRepository,
    ) {}

    @Cron(environment.cronExpression)
    async synchronize() {
        try {
            const dadosEquipamentos = await this.getEquipamentoFullDataQuery.execute();

            dadosEquipamentos.forEach((equipamento) => {
                const { idEquipamento, ...data } = equipamento;
                this.cacheStorageRepository.setValue(String(idEquipamento), JSON.stringify(data));
            });

            console.log(await this.cacheStorageRepository.getValue("GCT003"));

            this.logger.log(`✅ Dados sincronizados com sucesso!`);
        } catch (error) {
            this.logger.error(`❌ Erro ao sincronizar dados: ${error.message}`);
        }
    }
}
