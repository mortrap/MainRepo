import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Redis } from 'ioredis';
import { Cut } from './cut';
import { chownSync } from 'fs';



@Injectable()
export class AppService {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redis: Redis) { }

  async getCuts(id_code: string): Promise<Cut[]> {
    const cuts = await this.redis.get(id_code)

    if (cuts) {
      return JSON.parse(cuts) as Cut[]
    }
    await this.redis.set(id_code, JSON.stringify(cuts), 'EX', 120);
    console.log("have not")
    //return this.cuts;
  }

  async arrayToRedis(parsed_result: string): Promise<any> {
    let idCodeSet = new Set<string>;
    let cutSet:Set<Cut> = new Set;
    let cuts: Cut[] = [];
    let whs = [];

    for (const mark of parsed_result) {
      let cut: Cut = new Cut(mark[0], mark[1], mark[2], mark[3], mark[4], whs)
      if (idCodeSet.has(mark[0])) {
         cutSet.add(cut);}
      idCodeSet.add(mark[0])
      cutSet.add(cut);
    }
    let num: number = 0;
    for (const mark of parsed_result) {
      cuts.length = 0;
      whs.length = 0;
      let newCut = new Cut(mark[0], mark[1], mark[2], mark[3], mark[4], whs);

      if (num >= 5) {
        for (const field of mark.slice(5)) {
          whs.push(field);
        }
      }
      cutSet.forEach(cut => {
        if (cut.id_code === newCut.id_code&&newCut!=cut)
          cuts.push(cut);});

      this.redis.set(mark[0], JSON.stringify(cuts));
      num++;

    }
  }
}

