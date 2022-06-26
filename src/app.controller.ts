import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('svisni/send-order')
  public sendOrder(@Body() formDataOrderDto: any): Promise<void> {
      console.log("formDataOrderDto___", formDataOrderDto);
      return this.appService.sendOrder(formDataOrderDto);
  }
}
