import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { SynchronizeSchedule } from "./infrastructure/adapter/io/schedule/synchronize.schedule";
import { QUERY_MANAGER } from "./application/gateway/query-manager.interface";
import { CACHE_STORAGE_REPOSITORY } from "./application/repository/cache-repository.interface";
import { RedisRepository } from "./infrastructure/config/database/redis";
import { ParametroRepositoryImpl } from "./infrastructure/adapter/persistence/repository/parametro-repository.impl";
import { PARAMETRO_REPOSITORY } from "./application/repository/parametro-repository.interface";
import { SyncQuerys } from "./infrastructure/adapter/persistence/query/core/sync-querys";
import { DrizzleQueryManager } from "./infrastructure/adapter/persistence/query/core/drizzle-query-manager";
import { SynchronizeService } from "./application/service/synchronize.service";
import { AppController } from "./infrastructure/adapter/io/controller/app.controller";
import { GetEquipamentoQuery } from "./infrastructure/adapter/persistence/query/get-equipamentos.query";
import { GetFaixasQuery } from "./infrastructure/adapter/persistence/query/get-faixas.query";
import { GetDeteccoesMidiaQuery } from "./infrastructure/adapter/persistence/query/get-deteccoes-midia.query";
import { GetImagensTesteQuery } from "./infrastructure/adapter/persistence/query/get-imagens-teste.query";
import { GetFaixasInfracoesQuery } from "./infrastructure/adapter/persistence/query/get-faixa-infracao.query";

@Module({
    imports: [ScheduleModule.forRoot()],
    providers: [
        SynchronizeService,
        SyncQuerys,
        GetDeteccoesMidiaQuery,
        GetEquipamentoQuery,
        GetImagensTesteQuery,
        GetFaixasInfracoesQuery,
        GetFaixasQuery,
        SynchronizeSchedule,
        DrizzleQueryManager,
        RedisRepository,
        ParametroRepositoryImpl,
        {
            provide: QUERY_MANAGER,
            useExisting: DrizzleQueryManager,
        },
        {
            provide: CACHE_STORAGE_REPOSITORY,
            useExisting: RedisRepository,
        },
        {
            provide: PARAMETRO_REPOSITORY,
            useClass: ParametroRepositoryImpl,
        },
    ],
    controllers: [AppController],
})
export class AppModule {}
