import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CacheModule } from '@nestjs/cache-manager';
import { RedisModule } from './redis.module';
import { AssetController } from './asset/asset.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth/auth.module';


@Module({
  imports: [RedisModule, CacheModule.register(), AuthModule ],
  controllers: [AppController, AssetController],
  providers: [AppService],
})
export class AppModule { }
