type ProcessEnv = {
    PORT: string;

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
    databaseHost: string;
    databasePort: number;
    databaseUsername: string;
    databasePassword: string;
    databaseName: string;
    databaseType: string;
    cronExpression: string;
    port: number;

    redisHost: string;
    redisPort: number;
};
