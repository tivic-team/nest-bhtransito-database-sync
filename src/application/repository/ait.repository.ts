import { Ait } from "../../domain/entity/ait";

export interface IAitRepository {
    findAitsConfirmacaoPendente(): Promise<Ait[]>;
    getUltimoAitConfirmado(): Promise<Ait>;
    save(ait: Ait): Promise<Ait>;
    saveAll(aits: Ait[]): Promise<Ait[]>;
}

export const AIT_REPOSITORY = "AitRepository";
