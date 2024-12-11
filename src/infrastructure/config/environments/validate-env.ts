import { VariavelDeAmbienteAusenteException } from "./environment-ausente.exception";

export function validateEnv(environment: Environment): void {
    if (!environment.databaseHost) {
        throw new VariavelDeAmbienteAusenteException("DB_HOST");
    }
    if (!environment.databasePort) {
        throw new VariavelDeAmbienteAusenteException("DB_PORT");
    }
    if (!environment.databaseUsername) {
        throw new VariavelDeAmbienteAusenteException("DB_USERNAME");
    }
    if (!environment.databasePassword) {
        throw new VariavelDeAmbienteAusenteException("DB_PASSWORD");
    }
    if (!environment.databaseName) {
        throw new VariavelDeAmbienteAusenteException("DB_DATABASE");
    }
    if (!environment.databaseType) {
        throw new VariavelDeAmbienteAusenteException("DB_TYPE");
    }
    if (!environment.cronExpression) {
        throw new VariavelDeAmbienteAusenteException("CRON_EXPRESSION");
    }
    if (!environment.redisHost) {
        throw new VariavelDeAmbienteAusenteException("REDIS_HOST");
    }
    if (!environment.redisPort) {
        throw new VariavelDeAmbienteAusenteException("REDIS_PORT");
    }
}
