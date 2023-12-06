import { Controller, Get, HttpStatus, Inject, NotFoundException, Param, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Cut } from './cut';
import { AuthService } from './auth/auth/auth.service';
import { AuthGuard } from './auth/auth/auth.guard';



@Controller('api/discount')
export class AppController {
  constructor(
    private redisService: AppService,
    private authService: AuthService) { }
  
  
  @Get(':id_code')
  async getCuts(
    @Res() res,
    @Param('id_code') id_code: string): Promise<Cut[]> {
    const cut = await this.redisService.getCuts(id_code);

    if (!cut) throw new NotFoundException('Cut does not exist');

    return res.status(HttpStatus.OK).json(cut);
  }



}
