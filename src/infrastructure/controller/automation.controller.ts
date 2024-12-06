import { Controller, Get } from "@nestjs/common";
import { AutomationService } from "src/application/service/automation.service";

@Controller()
export class AutomationController {
    constructor(private readonly _automationService: AutomationService) {}

    @Get("executar")
    executar(): void {
        this._automationService.executar();
    }
}
