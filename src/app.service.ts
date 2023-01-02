import { Injectable } from '@nestjs/common';
import { transformEmailData } from './teamplates/orderTeamplate';
import { transformSocialData } from './teamplates/orderTeamplateSendVK';
import { MailerService } from '@nestjs-modules/mailer';
import VkBot from 'node-vk-bot-api';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  getHello(): string {
    return 'Hello World!1000';
  }

  public async sendOrder(formDataOrderDto: any): Promise<void> {
    const emailData = transformEmailData(formDataOrderDto);
    this.mailerService
      .sendMail(emailData)
      .then(() => {})
      .catch((error) => console.log(error)
      );
  }
  }