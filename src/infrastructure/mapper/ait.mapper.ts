import { Ait, AitProps } from "src/domain/entity/ait";

export class AitMapper {
    static toDomain(ait: AitProps) {
        return new Ait(ait);
    }

    static toPersistence(ait: Ait) {
        return {
            codigoAit: ait.getCodigoAit(),
            dtInfracao: ait.getDtInfracao(),
            cdEquipamento: ait.getcdEquipamento(),
            nrAit: ait.getNrAit(),
            stAit: ait.getStAit(),
        };
    }
}
