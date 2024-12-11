export interface ICacheStorageRepository {
    setValue(key: string, value: string): Promise<string>;
    getValue<T>(key: string): Promise<T>;
}

export const CACHE_STORAGE_REPOSITORY = "CacheStorageRepository-1";
