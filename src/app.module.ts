import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { SynchronizeSchedule } from "./infrastructure/adapter/schedule/synchornize.schedule";
import { GetEquipamentoFullDataQuery } from "./infrastructure/adapter/query/get-equipamento-full-data.query";
import { QUERY_MANAGER } from "./application/gateway/query-manager.interface";
import { DrizzleQueryManager } from "./infrastructure/adapter/query/drizzle-query-manager";
import { CACHE_STORAGE_REPOSITORY } from "./application/repository/cache-repository.interface";
import { RedisRepository } from "./infrastructure/config/database/redis";
import { ParametroRepositoryImpl } from "./infrastructure/adapter/repository/parametro-repository.impl";
import { PARAMETRO_REPOSITORY } from "./application/repository/parametro-repository.interface";

@Module({
    imports: [ScheduleModule.forRoot()],
    providers: [
        GetEquipamentoFullDataQuery,
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
    controllers: [],
})
export class AppModule {}
