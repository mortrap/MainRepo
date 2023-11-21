import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Post, UseInterceptors, UploadedFile, Inject, Get, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { readFileSync, readSync } from 'fs';
import {diskStorage} from 'multer';
import {parse} from 'papaparse';
import { Cut } from './cut.entity';
import { Cache } from 'cache-manager';
import Redis from 'ioredis';




@Controller('asset')
export class AssetController {
    constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}
    @Post()
    @UseInterceptors(
        FileInterceptor('file_asset', {
            storage: diskStorage({
                destination: './files',
                filename: (req, file, cb) => {
                    cb(null, file.originalname);
                  },
                }),
            }),
        )
    async local(@UploadedFile() file: Express.Multer.File) {
            let redis = await this.redis;
            const csvFile = readFileSync('./files/uploadOTREZ.csv', {encoding: 'utf-8'});
            const csvData = csvFile.toString();
            const parseCsv = await parse(csvData, {
                skipEmptyLines: true,
                complete: (results) =>arrayToRedis(results.data),
            });
            return {
              statusCode: 200,
              data: file.path,
            };
            
            function arrayToRedis(parse_result: string){
                let cutMap:Map<any, any> = new Map;
                let fields_headers = ['id_code', 'old_price', 'price', 'none_cut', 'cut', 'whs1','whs2',
                'whs3','whs4','whs5','whs6','whs7','whs8','whs9','whs10','whs11','whs12','whs13',
                'whs14','whs15','whs16','whs17','whs18','whs19','whs20'];
                // const cut = new Cut(parse_result[0],parse_result[1],
                //     parse_result[2], parse_result[3], parse_result[4], parse_result[5]);
                 let num :number = 0;
                 for(const mark of parse_result ){
                    
                     let count :number = 0;
                    
                     for (const field of mark){
                         cutMap.set(fields_headers[count], field);
                         count++;
                     }
                    
                    redis.set(mark[0], cutMap.toString());
                    num++;
                    console.log(mark[0], '=', cutMap, "writed in redis");
                    cutMap.clear();
                        
               }
                console.log();
            }
          }
}

