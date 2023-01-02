import { Module } from '@nestjs/common';
import { VKontakteController } from './vkontakte.controller';
import { VKontakteService } from './vkontakte.service';

@Module({
    controllers: [VKontakteController],
    providers: [
        VKontakteService,
        VKontakteController
    ]
})
export class VKmodule {}
