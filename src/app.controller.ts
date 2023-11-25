import { Controller, Get, HttpStatus, Inject, NotFoundException, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Cut } from './cut';
import { Role } from './auth/role.enum';
import { Roles } from './auth/roles.decorator';


@Controller('api/discount')
export class AppController {
  constructor(private redisService: AppService) { }
  @Get(':id_code')
  
  async getCuts(
    @Res() res,
    @Param('id_code') id_code: string): Promise<Cut[]> {

    const cut = await this.redisService.getCuts(id_code);

    if (!cut) throw new NotFoundException('Cut does not exist');

    return res.status(HttpStatus.OK).json(cut);
  }



}
