import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CachingService implements OnApplicationBootstrap {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async set(key: string, value: any, ttl?: number) {
    await this.cache.set(key, value, ttl);
  }

  async get(key: string) {
    return await this.cache.get(key);
  }

  async delete(key: string) {
    await this.cache.del(key);
  }

  async onApplicationBootstrap() {
    await this.cache.reset();
  }
}
