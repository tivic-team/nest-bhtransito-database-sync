import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { SynchronizeSchedule } from "./infrastructure/adapter/io/schedule/synchronize.schedule";
import { QUERY_MANAGER } from "./application/gateway/query-manager.interface";
import { CACHE_STORAGE_REPOSITORY } from "./application/repository/cache-repository.interface";
import { RedisRepository } from "./infrastructure/config/database/redis";
import { ParametroRepositoryImpl } from "./infrastructure/adapter/persistence/repository/parametro-repository.impl";
import { PARAMETRO_REPOSITORY } from "./application/repository/parametro-repository.interface";
import { GetEquipamentoFullDataQuery } from "./infrastructure/adapter/persistence/query/get-equipamento-full-data.query";
import { DrizzleQueryManager } from "./infrastructure/adapter/persistence/query/drizzle-query-manager";
import { SynchronizeService } from "./application/service/synchronize.service";
import { AppController } from "./infrastructure/adapter/io/controller/app.controller";

@Module({
    imports: [ScheduleModule.forRoot()],
    providers: [
        SynchronizeService,
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
    controllers: [AppController],
})
export class AppModule {}
