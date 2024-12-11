import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { SynchronizeService } from "./infrastructure/schedule/synchornize.service";
import { GetEquipamentoFullDataQuery } from "./application/query/get-equipamento-full-data.query";
import { QUERY_MANAGER } from "./application/gateway/query-manager.interface";
import { DrizzleQueryManager } from "./infrastructure/gateway-impl/drizzle-query-manager";
import { CACHE_STORAGE_REPOSITORY } from "./application/repository/cache-repository.interface";
import { RedisRepository } from "./infrastructure/config/database/redis";

@Module({
    imports: [ScheduleModule.forRoot()],
    providers: [
        GetEquipamentoFullDataQuery,
        SynchronizeService,
        DrizzleQueryManager,
        RedisRepository,
        {
            provide: QUERY_MANAGER,
            useExisting: DrizzleQueryManager,
        },
        {
            provide: CACHE_STORAGE_REPOSITORY,
            useExisting: RedisRepository,
        },
    ],
    controllers: [],
})
export class AppModule {}
