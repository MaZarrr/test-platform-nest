import { Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';
import { transformEmailData } from './teamplates/orderTeamplate';

@Injectable()
export class AppService {
  constructor() {
    SendGrid.setApiKey("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");
  }


  getHello(): string {
    return 'Hello World!';
  }

  public async sendOrder(formDataOrderDto: any): Promise<void> {
   
    const emailData = transformEmailData(formDataOrderDto)
    console.log("emailData___", emailData);
    
    SendGrid
    .send(emailData)
    .then(() => {}, error => {
    console.error(error);

    if (error.response) {
        console.error(error.response.body)
    }
  })
};
  
}
