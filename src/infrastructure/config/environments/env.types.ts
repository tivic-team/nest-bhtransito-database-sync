type ProcessEnv = {
    PORT: string;
    HOST: string;
    CONTEXT: string;
    PROTOCOL: string;

    DB_TYPE: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    CRON_EXPRESSION: string;

    REDIS_HOST: string;
    REDIS_PORT: string;
};

type Environment = {
    port: number;
    host: string;
    context: string;
    protocol: string;

    databaseHost: string;
    databasePort: number;
    databaseUsername: string;
    databasePassword: string;
    databaseName: string;
    databaseType: string;
    cronExpression: string;

    redisHost: string;
    redisPort: number;
};
