import { Inject, Injectable } from "@nestjs/common";
import { sql } from "drizzle-orm";
import { FaixaDTO } from "src/application/dto/faixa.dto";
import { QUERY_MANAGER, QueryManager } from "src/application/gateway/query-manager.interface";
import { GetImagensTesteQuery } from "./get-imagens-teste.query";
import { ImagemTesteDTO } from "src/application/dto/imagem-teste.dto";
import { InfracaoDTO } from "src/application/dto/faixa-infracao.dto";
import { GetFaixasInfracoesQuery } from "./get-faixa-infracao.query";

@Injectable()
export class GetFaixasQuery {
    constructor(
        @Inject(QUERY_MANAGER)
        private queryManager: QueryManager,
        private getImagensTesteQuery: GetImagensTesteQuery,
        private getFaixasInfracoesQuery: GetFaixasInfracoesQuery,
    ) {}

    public async exec(): Promise<FaixaDTO[]> {
        const imagensTeste = await this.getImagensTesteQuery.exec();
        const infracoes = await this.getFaixasInfracoesQuery.exec();

        const result = await this.queryManager.execute(sql`
            SELECT A.nr_faixa,A.tp_sentido, A.cd_faixa, A.cd_equipamento, B.nm_sentido_via AS sentido_via_origem, 
            C.nm_sentido_via AS sentido_via_destino FROM opr_faixa AS A
            LEFT JOIN opr_sentido_via AS B ON B.cd_sentido_via = A.cd_sentido_via_origem
            LEFT JOIN opr_sentido_via AS C ON C.cd_sentido_via = A.cd_sentido_via_destino
        `);

        const rows: FaixaDTO[] = result.map((faixa) => ({
            tpSentido: (faixa.tp_sentido as number) ?? null,
            nrFaixa: faixa.nr_faixa as number,
            cdFaixa: faixa.cd_faixa as number,
            cdEquipamento: faixa.cd_equipamento as number,
            sentidoViaDestino: faixa.sentido_via_destino as string,
            sentidoViaOrigem: faixa.sentido_via_origem as string,
            dsInfracoes: this.extractInfracoes(infracoes, faixa.cd_faixa as number),
            imagensTeste: this.extractImagensTeste(imagensTeste, faixa.cd_faixa as number),
        }));

        return rows;
    }

    private extractImagensTeste(imagensTeste: ImagemTesteDTO[], cdFaixa: number) {
        return imagensTeste.filter((imagemTeste) => {
            if (imagemTeste.cdFaixa === cdFaixa) {
                delete imagemTeste.cdFaixa;
                return imagemTeste;
            }
        });
    }

    private extractInfracoes(infracoes: InfracaoDTO[], cdFaixa: number) {
        return infracoes.filter((infracao) => {
            if (infracao.cdFaixa === cdFaixa) {
                delete infracao.cdFaixa;
                return infracao;
            }
        });
    }
}
