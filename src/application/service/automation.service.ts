import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { CustomFileHandle } from "@tivic-team/core-nest-tivic/dist/file/custom-file-handle";
import * as moment from "moment";
import { Ait } from "src/domain/entity/ait";
import { environment } from "src/infrastructure/environments/env";
import { AIT_REPOSITORY, IAitRepository } from "src/application/repository/ait.repository";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class AutomationService implements OnModuleInit {
    private readonly logger = new Logger(AutomationService.name);
    private readonly fileHandle = new CustomFileHandle();
    private proximoNrAit: number;
    constructor(
        @Inject(AIT_REPOSITORY)
        private readonly aitRepository: IAitRepository,
    ) {}

    @Cron(environment.cronExpression || "*/30 * * * * *")
    async executar(): Promise<void> {
        try {
            const aits = await this.aitRepository.findAitsConfirmacaoPendente();
            if (!aits || aits.length === 0 || !aits.length) {
                this.logger.log("Não foram retornados AITs com confirmação pendente");
                return;
            }

            environment.gravarLogAits && this.gravarAits(aits, "initial");
            this.logger.log(`Foram retornados ${aits.length} AITs com confirmação pendente`);

            if (environment.inserirPrefixoRT) {
                await this.defineProximoNrAit();
            }

            await this.confirmarAits(aits);

            environment.gravarLogAits && this.gravarAits(aits, "updated");
            this.logger.log("Processo finalizado com sucesso");
        } catch (e) {
            this.logger.error(e);
            console.log(e);
        }
    }

    private gravarAits(aits: Ait[], tipo: "initial" | "updated"): void {
        const nomeArquivo = `${moment().format("DD-MM-YYYY")}-${tipo}.json`;
        this.fileHandle.createFile(environment.diretorioLogs, nomeArquivo, JSON.stringify(aits));
    }

    private async confirmarAits(aits: Ait[]): Promise<void> {
        aits.forEach(async (ait) => {
            this.proximoNrAit++;
            ait.confirmar(this.proximoNrAit);
            await this.aitRepository.save(ait);
        });
    }

    async onModuleInit() {
        await this.defineProximoNrAit();
    }

    private async defineProximoNrAit(): Promise<void> {
        const ultimoAitConfirmado = await this.aitRepository.getUltimoAitConfirmado();
        if (!ultimoAitConfirmado) {
            this.proximoNrAit = 0;
            return;
        }
        this.proximoNrAit = Number(ultimoAitConfirmado.getNrAit().replace("RT", ""));
    }
}
