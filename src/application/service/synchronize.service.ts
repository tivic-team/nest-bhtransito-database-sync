import { Inject, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { SyncQuerys } from "src/infrastructure/adapter/persistence/query/core/sync-querys";
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
        @Inject(CACHE_STORAGE_REPOSITORY)
        private readonly cacheStorageRepository: ICacheStorageRepository,
        @Inject(PARAMETRO_REPOSITORY)
        private readonly parametroRepository: IParametroRepository,
        private readonly syncQuerys: SyncQuerys,
    ) {}

    async synchronize() {
        try {
            await this.syncEquipamentos();
            await this.syncParametros();
            this.logger.log(`✅ Dados sincronizados com sucesso!`);
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    private async syncEquipamentos() {
        const dadosEquipamentos = await this.syncQuerys.execute();

        dadosEquipamentos.forEach(async (equipamento) => {
            const { idEquipamento, ...data } = equipamento;
            await this.cacheStorageRepository.setValue(String(idEquipamento), JSON.stringify(data));
        });
    }

    private async syncParametros() {
        const parametros = await this.parametroRepository.getParametros();
        await this.cacheStorageRepository.setValue("parametros", JSON.stringify(parametros));
    }
}
