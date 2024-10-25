import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('/')
export class AppController {
  constructor() {}

  @Get('/')
  async getOrganizations(@Res() res: Response) {
    res.send('Server is running').end();
  }
}
