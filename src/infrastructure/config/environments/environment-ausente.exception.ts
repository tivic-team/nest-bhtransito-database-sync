export class VariavelDeAmbienteAusenteException extends Error {
    constructor(variavel: string) {
        super(`Variável de ambiente ausente: ${variavel}`);
    }
}
