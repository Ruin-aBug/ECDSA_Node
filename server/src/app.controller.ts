import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { BalanceDto } from './dto/balance.dto';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/balance/:address')
  getBalance(@Param('address') address: string): number {
    return this.appService.getBalance(address);
  }

  @Post('/send')
  send(@Body() body: BalanceDto) {
    const { sender, recipient, amount } = body;
    const res = this.appService.send(sender, recipient, +amount);
    if (res) {
      return res;
    }
    throw new HttpException('balance too lower', 403);
  }
}
