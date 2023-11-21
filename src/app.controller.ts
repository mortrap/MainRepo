import { Controller, Get, HttpStatus, Inject, NotFoundException, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';


@Controller('api/discount')
export class AppController {
  constructor(private redisService: AppService){}
  @Get(':id_code')
  async getCuts(
    @Res() res,
    @Param('id_code') id_code: string): Promise<any> {
   
   const cut = await this.redisService.getCuts(id_code);
   
   if (!cut) throw new NotFoundException('Contact does not exist');

        return res.status(HttpStatus.OK).json(cut);
}



}
