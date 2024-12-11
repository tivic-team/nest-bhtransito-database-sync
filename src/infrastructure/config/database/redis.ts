import { Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { environment } from "../environments/env";
import { ICacheStorageRepository } from "src/application/repository/cache-repository.interface";

@Injectable()
export class RedisRepository extends Redis implements ICacheStorageRepository {
    constructor() {
        super({
            host: environment.redisHost,
            port: environment.redisPort,
        });
    }

    async setValue(key: string, value: string): Promise<string> {
        return this.set(key, value);
    }

    async getValue<T>(key: string): Promise<T> {
        return this.get(key) as unknown as T;
    }
}
