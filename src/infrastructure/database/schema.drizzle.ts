import { integer, pgTable, serial, smallint, timestamp, varchar } from "drizzle-orm/pg-core";


export const glrEquipamentoTable = pgTable("glr_equipamento", {
    cdEquipamento: serial("cd_equipamento").primaryKey(),
    tpEquipamento: smallint("tp_equipamento").notNull(),
})

export const aitTable = pgTable("ait", {
    codigoAit: serial("codigo_ait").primaryKey(),
    dtInfracao: timestamp("dt_infracao").notNull(),
    nrAit: varchar("nr_ait").unique().notNull(),
    stAit: smallint("st_ait").notNull(),
    cdEquipamento : integer("cd_equipamento").notNull()
        .references(()=>glrEquipamentoTable.cdEquipamento)
});

