import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import{Redis }from 'ioredis';
import { Cut } from './cut';



@Injectable()
export class AppService {
  private readonly cuts:Cut[] = [];
  constructor(
  @Inject('REDIS_CLIENT') 
  private readonly redis: Redis) {}

  async getCuts(id_code: string): Promise<Cut[]>{
    const cuts =await this.redis.get(id_code)
    
        if(cuts) {
      return JSON.parse(cuts) as Cut[]}
      await this.redis.set(id_code, JSON.stringify(this.cuts),'EX', 120);
      return this.cuts;
  }
  
  async arrayToRedis(parsed_result: string):Promise<Cut[]>{
    let whs =[];
     let num :number = 0;
     for(const mark of parsed_result ){
        
        whs.length=0;
        let newCut = new Cut(mark[0], mark[1], mark[2], mark[3], mark[4], whs)
        if(num>=5){ 
          for (const field of mark.slice(5)){
              whs.push(field);
         }}
        this.cuts.push( newCut);
        this.redis.set(mark[0], JSON.stringify(newCut));
        num++;
      
   }
   
   return this.cuts;
}
    
   
   
  }
  

