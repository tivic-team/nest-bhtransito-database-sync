import { FaixaDTO } from "./faixa.dto";

export interface EquipamentoDTO {
    qtTempoRetardo: number;
    idEquipamento: string;
    cdEquipamento: number;
    lgMetrologico: number;
    nrSerie: string;
    faixas?: Omit<FaixaDTO, "cdEquipamento">[];
}
