import { Module } from "@nestjs/common";
import { AutomationController } from "./infrastructure/controller/automation.controller";
import { AutomationService } from "./application/service/automation.service";
import { AitRepositoryImpl } from "./infrastructure/repository/ait.repository.impl";
import { AIT_REPOSITORY } from "./application/repository/ait.repository";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
    imports: [ScheduleModule.forRoot()],
    providers: [
        AutomationService,
        AitRepositoryImpl,
        {
            useExisting: AitRepositoryImpl,
            provide: AIT_REPOSITORY,
        },
    ],
    controllers: [AutomationController],
})
export class AppModule {}
