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
        this.nrAit = this.buildNrAit(nrAit);
        this.stAit = StAitEnum.CONFIRMADO;
    }

    private buildNrAit(nrAit: number){
        const customNrAit = "RT" + nrAit.toFixed(0).padStart(10, "0");
        return String(environment.inserirPrefixoRT ? customNrAit : this.nrAit);
    }

    public getCodigoAit = () => this.codigoAit;
    public getDtInfracao = () => this.dtInfracao;
    public getcdEquipamento = () => this.cdEquipamento;
    public getNrAit = () => this.nrAit;
    public getStAit = () => this.stAit;
}
