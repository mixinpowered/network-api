import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {
  CacheInterceptor,
  CacheModule,
  CacheStore,
} from '@nestjs/cache-manager';
import { CachingModule } from './caching/caching.module';
import { CommonModule } from './common/common.module';
import { PlayersModule } from './players/players.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        REDIS_PASSWORD: Joi.string().required(),
        REDIS_USER: Joi.string().required(),
      }),
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const redis = await redisStore({
          socket: {
            host: config.get('REDIS_HOST'),
            port: +config.get('REDIS_PORT'),
          },
          password: config.get('REDIS_PASSWORD'),
          username: config.get('REDIS_USER'),
        });

        return {
          store: redis as unknown as CacheStore,
          ttl: 60 * 60 * 2, // 2 hours
        };
      },
      isGlobal: true,
    }),
    CachingModule,
    CommonModule,
    PlayersModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
