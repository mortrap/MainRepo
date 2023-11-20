import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class AppService {
  constructor(
  @Inject('REDIS_CLIENT') 
  private readonly redis: Redis) {}

  async getCuts(id_code: string): Promise<any> {
    const val = await this.redis.get(id_code)
        if(val) {
      return { 
        data: val.normalize,
        FromRedis: 'this is loaded from redis cache'
      }
    }
  
    if(!val){
      await this.redis.set('id_code', 'f' )
      return {
        data: 'f',
        FromRandomNumDbs: 'this is loaded from randomNumDbs'
    }
  }
  }
  }

