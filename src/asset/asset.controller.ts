
import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { readFileSync, readSync } from 'fs';
import { diskStorage } from 'multer';
import { parse } from 'papaparse';

import { AppService } from 'src/app.service';


@Controller('asset')
export class AssetController {
    constructor(private cacheM: AppService) { }
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
    async local(
        @UploadedFile()
        file: Express.Multer.File
    ) {
        const csvFile = readFileSync('./files/uploadOTREZ.csv', { encoding: 'utf-8' });
        const csvData = csvFile.toString();
        const parseCsv = await parse(csvData, {
            skipEmptyLines: true,
            complete: (results) => this.cacheM.arrayToRedis(results.data),
        });
        return {
            statusCode: 200,
            data: file.path,
        };
    }
}

