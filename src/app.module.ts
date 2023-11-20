import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetModule } from './asset/asset.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisModule } from './asset/redis.module';


@Module({
  imports: [AssetModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
