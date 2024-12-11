export type Parametro = {
    nmParametro: string;
    vlParametro: string;
};

export interface IParametroRepository {
    getParametros(): Promise<Parametro[]>;
}

export const PARAMETRO_REPOSITORY = "ParametroRepository-1";
