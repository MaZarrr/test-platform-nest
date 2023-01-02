import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConfigModule } from '@nestjs/config';
import { VKontakteService } from './vkontakte/vkontakte.service';
import { VKontakteController } from './vkontakte/vkontakte.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MailerModule.forRoot({
      transport: `smtps://${process.env.EMAIL_FROM}:${process.env.EMAIL_API}@smtp.yandex.ru`,
      defaults: {
        from: `"WebWork" <${process.env.EMAIL_FROM}>`,
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController, VKontakteController],
  providers: [AppService, VKontakteService],
})
export class AppModule {}
