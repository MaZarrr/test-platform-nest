import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { VKontakteService } from './vkontakte.service';

@Controller()
export class VKontakteController {
  constructor(private readonly vkService: VKontakteService) {}

  @Post('test')
  public async test(): Promise<void> {
    return this.vkService.test();
  }

  @Post('sending')
  public async sendMessageVK(@Body() formDataOrderDto: any): Promise<void> {
    return this.vkService.sendMessageVK(formDataOrderDto);
  }

  @Post('getGroupOrders')
  public async getGroupOrders(@Body() albumsData: any): Promise<void> {
    return this.vkService.getGroupOrders(albumsData);
  }

  @Post('getUserOrders')
  public async getUserOrders(@Body() albumsData: any): Promise<void> {
    return this.vkService.getUserOrders(albumsData);
  }

  @Post('getAllProducts')
  public async getAllProducts(@Body() proudctsData: any): Promise<void> {
    return this.vkService.getAllProducts(proudctsData);
  }

  @Post('getProducts')
  public async getProducts(@Body() proudctsData: any): Promise<void> {
    return this.vkService.getProducts(proudctsData);
  }

  @Post('getWall')
  public async getWall(@Body() wallData: any): Promise<void> {
    return this.vkService.getWall(wallData);
  }

  @Post('getProduct')
  public async getProduct(@Body() proudctData: any): Promise<void> {
    return this.vkService.getProduct(proudctData);
  }

  @Post('getCategories')
  public async getCategories(@Body() categoriesData: any): Promise<void> {
    return this.vkService.getCategories(categoriesData);
  }

  @Post('getAlbums')
  public async getAlbums(@Body() albumsData: {count: number, isGroup: boolean}): Promise<{ok: boolean, data: any}> {
    return this.vkService.getAlbums({count: albumsData.count, isGroup: albumsData.isGroup});
  }

  @Get('auth')
  public async authToken(@Body() authData: any, @Res() res: any): Promise<void> {
    return this.vkService.auth(authData, res);
  }
}
