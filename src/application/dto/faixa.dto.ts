import { ImagemTesteDTO } from "./imagem-teste.dto";
import { InfracaoDTO as FaixaInfracaoDTO } from "./faixa-infracao.dto";

export interface FaixaDTO {
    tpSentido: number;
    nrFaixa: number;
    cdFaixa: number;
    cdEquipamento: number;
    sentidoViaDestino: string;
    sentidoViaOrigem: string;
    dsInfracoes: Omit<FaixaInfracaoDTO, "cdFaixa">[];
    imagensTeste: Omit<ImagemTesteDTO, "cdFaixa">[];
}
