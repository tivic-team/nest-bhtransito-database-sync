import { Injectable } from "@nestjs/common";
import { environment } from "../../../config/environments/env";
import { Cron } from "@nestjs/schedule";

import { SynchronizeService } from "src/application/service/synchronize.service";

@Injectable()
export class SynchronizeSchedule {
    constructor(private readonly synchronizeService: SynchronizeService) {}

    // @Cron(environment.cronExpression)
    async synchronize() {
        await this.synchronizeService.synchronize();
    }
}
