import { Controller, Get } from "@nestjs/common";
import { SynchronizeService } from "src/application/service/synchronize.service";

@Controller()
export class AppController {
    constructor(private readonly synchronizeService: SynchronizeService) {}

    @Get("/")
    async hello() {
        return { message: "Tudo certo por aqui. E aí? 🤔" };
    }

    @Get("/execute")
    async execute() {
        try {
            await this.synchronizeService.synchronize();
            return { message: "✅ Dados sincronizados com sucesso" };
        } catch (error) {
            return { message: `❌ Erro ao executar serviço: ${error.message}` };
        }
    }
}
