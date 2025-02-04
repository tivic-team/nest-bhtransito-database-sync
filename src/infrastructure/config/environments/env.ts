import "dotenv/config";
import { validateEnv } from "./validate-env";
import { getIntEnv } from "./env.utils";

const processEnv = process.env as ProcessEnv;
export const environment: Environment = {
    port: getIntEnv(processEnv.PORT),
    host: processEnv.HOST,
    context: processEnv.CONTEXT,
    protocol: processEnv.PROTOCOL,

    databaseHost: processEnv.DB_HOST,
    databasePort: getIntEnv(processEnv.DB_PORT),
    databaseUsername: processEnv.DB_USERNAME,
    databasePassword: processEnv.DB_PASSWORD,
    databaseName: processEnv.DB_DATABASE,
    databaseType: processEnv.DB_TYPE,
    cronExpression: processEnv.CRON_EXPRESSION,
    redisHost: processEnv.REDIS_HOST,
    redisPort: getIntEnv(processEnv.REDIS_PORT),
};

validateEnv(environment);
