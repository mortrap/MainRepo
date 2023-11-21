import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CacheModule } from '@nestjs/cache-manager';
import { RedisModule } from './redis.module';
import { AssetController } from './asset/asset.controller';


@Module({
  imports: [RedisModule,CacheModule.register()],
  controllers: [AppController, AssetController],
  providers: [AppService],
})
export class AppModule {}
