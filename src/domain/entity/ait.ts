import { StAitEnum } from "src/domain/enum/st-ait.enum";
import { environment } from "src/infrastructure/environments/env";

export type AitProps = {
    codigoAit: number;
    dtInfracao: Date;
    nrAit: string;
    stAit: StAitEnum;
    cdEquipamento: number;
};

export class Ait {
    private codigoAit: number;
    private dtInfracao: Date;
    private nrAit: string;
    private stAit: number;
    private cdEquipamento: number;

    constructor(props: AitProps) {
        this.codigoAit = props.codigoAit;
        this.dtInfracao = props.dtInfracao;
        this.cdEquipamento = props.cdEquipamento;
        this.nrAit = props.nrAit;
        this.stAit = props.stAit;
    }

    public confirmar(nrAit: number) {
        this.nrAit = String(environment.inserirPrefixoRT ? "RT" + nrAit : this.nrAit);
        this.stAit = StAitEnum.CONFIRMADO;
    }

    getCodigoAit = () => this.codigoAit;
    getDtInfracao = () => this.dtInfracao;
    getcdEquipamento = () => this.cdEquipamento;
    getNrAit = () => this.nrAit;
    getStAit = () => this.stAit;
}
