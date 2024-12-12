import { VariavelDeAmbienteAusenteException } from "./environment-ausente.exception";

export function validateEnv(environment: Environment): void {
    const requiredVariables = {
        databaseHost: "DB_HOST",
        databasePort: "DB_PORT",
        databaseUsername: "DB_USERNAME",
        databasePassword: "DB_PASSWORD",
        databaseName: "DB_DATABASE",
        databaseType: "DB_TYPE",
        cronExpression: "CRON_EXPRESSION",
        redisHost: "REDIS_HOST",
        redisPort: "REDIS_PORT",
        port: "PORT",
        host: "HOST",
        context: "CONTEXT",
        protocol: "PROTOCOL",
    };

    for (const [key, variableName] of Object.entries(requiredVariables)) {
        if (!environment[key as keyof Environment]) {
            throw new VariavelDeAmbienteAusenteException(variableName);
        }
    }
}
