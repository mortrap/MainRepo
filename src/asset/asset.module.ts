import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from './redis.module';

@Module({
  imports: [RedisModule],
  controllers: [AssetController],
})
export class AssetModule {}
