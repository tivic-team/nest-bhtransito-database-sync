import "dotenv/config";

type ProcessEnv = {
    DIRETORIO_LOGS: string;
    DB_TYPE: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    INSERIR_PREFIXO_RT: string;
    SALVAR_LOG_AITS: string;
    CRON_EXPRESSION: string;
};

type Environment = {
    databaseHost: string;
    databasePort: number;
    databaseUsername: string;
    databasePassword: string;
    databaseName: string;
    databaseType: string;

    gravarLogAits: boolean;
    diretorioLogs: string;

    cronExpression: string;
    inserirPrefixoRT: boolean;
};
const getIntEnv = (value: string): number => (value ? parseInt(value) : null);
const getBooleanEnv = (value: string): boolean => (value ? !!+value : false);
const processEnv = process.env as ProcessEnv;

export const environment: Environment = {
    inserirPrefixoRT: getBooleanEnv(processEnv.INSERIR_PREFIXO_RT),
    gravarLogAits: getBooleanEnv(processEnv.SALVAR_LOG_AITS),
    databaseHost: processEnv.DB_HOST,
    databasePort: getIntEnv(processEnv.DB_PORT),
    databaseUsername: processEnv.DB_USERNAME,
    databasePassword: processEnv.DB_PASSWORD,
    databaseName: processEnv.DB_DATABASE,
    databaseType: processEnv.DB_TYPE,
    cronExpression: processEnv.CRON_EXPRESSION,
    diretorioLogs: processEnv.DIRETORIO_LOGS,
};
