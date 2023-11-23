import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Redis } from 'ioredis';
import { Cut } from './cut';




@Injectable()
export class AppService {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redis: Redis) { }

  async getCuts(id_code: string): Promise<Cut[]> {
    const cuts = await this.redis.get(id_code);

    if (cuts) {
      return JSON.parse(cuts) as Cut[]
    }
    await this.redis.set(id_code, JSON.stringify(cuts), 'EX', 120);
    console.log("have not")
  }

  async arrayToRedis(parsed_result: string): Promise<any> {

    let cutSet: Set<Cut> = new Set;
    let cuts: Cut[] = [];
    let whss = [];
    let whs = [];
    let seq: number = 0;
    for (const mark of parsed_result) {
      whss.length = 0;
      let cut: Cut = new Cut(mark[0], mark[1], mark[2], mark[3], mark[4], [])
      if (seq >= 5) {
        for (const wh of mark.slice(5)) {
          
          cut.whs.push(parseInt(wh));
        }
      };
      cutSet.add(cut);
      seq++;

      
    }
    
    cutSet.forEach(value => console.log(value));
    
    let num: number = 0;
    for (const mark of parsed_result) {
      cuts.length = 0;

  
      cutSet.forEach(cut => {
        if (cut.id_code === mark[0] && cut!=null) {
          
          cuts.push(cut);
         
        }
      });

      this.redis.set(mark[0], JSON.stringify(cuts));
      num++;
      
    }
  }
}

