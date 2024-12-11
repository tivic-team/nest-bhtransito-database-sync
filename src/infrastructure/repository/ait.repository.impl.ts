import { eq, and, inArray, like, desc } from "drizzle-orm";
import { Drizzle } from "src/infrastructure/database/db";
import { IAitRepository } from "src/application/repository/ait.repository";
import { aitTable, glrEquipamentoTable } from "src/infrastructure/database/schema.drizzle";
import { Ait } from "src/domain/entity/ait";
import { StAitEnum } from "src/domain/enum/st-ait.enum";
import { TpEquipamentoEnum } from "src/domain/enum/tp-equipamento.enum";
import { AitMapper } from "../mapper/ait.mapper";

export class AitRepositoryImpl implements IAitRepository {
    constructor(private readonly db = Drizzle.getDatabase()) {}

    async findAitsConfirmacaoPendente(): Promise<Ait[]> {
        const result = await this.db
            .select()
            .from(aitTable)
            .leftJoin(
                glrEquipamentoTable,
                eq(aitTable.cdEquipamento, glrEquipamentoTable.cdEquipamento),
            )
            .where(
                and(
                    eq(aitTable.stAit, StAitEnum.CONFIRMACAO_PENDENTE),
                    inArray(glrEquipamentoTable.tpEquipamento, [
                        TpEquipamentoEnum.RADAR_FIXO,
                        TpEquipamentoEnum.AVANCO_SINAL_PARADA_FAIXA,
                    ]),
                ),
            )
            .orderBy(aitTable.dtInfracao)
            .execute();
        return result.map(({ ait }) => new Ait(ait));
    }

    async getUltimoAitConfirmado(): Promise<Ait> {
        const result = await this.db
            .select()
            .from(aitTable)
            .leftJoin(
                glrEquipamentoTable,
                eq(aitTable.cdEquipamento, glrEquipamentoTable.cdEquipamento),
            )
            .where(
                and(
                    eq(aitTable.stAit, StAitEnum.CONFIRMADO),
                    inArray(glrEquipamentoTable.tpEquipamento, [
                        TpEquipamentoEnum.RADAR_FIXO,
                        TpEquipamentoEnum.AVANCO_SINAL_PARADA_FAIXA,
                    ]),
                    like(aitTable.nrAit, "RT%"),
                ),
            )
            .orderBy(desc(aitTable.nrAit))
            .limit(1)
            .execute()
            .then((results) => results[0]);

        if (!result) return null;
        return new Ait(result.ait);
    }

    async save(ait: Ait): Promise<Ait> {
        const aitExistente = await this.getAit(ait.getCodigoAit());
        if (aitExistente) {
            return this.updateAit(ait);
        }
        const result = await this.db
            .insert(aitTable)
            .values(AitMapper.toPersistence(ait))
            .returning()
            .execute();
        return result[0] ? new Ait(result[0]) : null;
    }

    async saveAll(aits: Ait[]): Promise<Ait[]> {
        const aitsPromisse = aits.map(async (ait) => {
            return this.save(ait);
        });

        return Promise.all(aitsPromisse);
    }

    private async getAit(codigoAit: number): Promise<Ait> {
        const result = await this.db
            .select()
            .from(aitTable)
            .where(eq(aitTable.codigoAit, codigoAit))
            .limit(1)
            .execute();

        if (!result) return null;
        return new Ait(result[0]);
    }

    private async updateAit(ait: Ait): Promise<Ait> {
        const result = await this.db
            .update(aitTable)
            .set({ stAit: ait.getStAit(), nrAit: ait.getNrAit() })
            .where(eq(aitTable.codigoAit, ait.getCodigoAit()))
            .returning()
            .execute();
        return result[0] ? new Ait(result[0]) : null;
    }
}
