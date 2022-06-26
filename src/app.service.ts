import { Injectable } from '@nestjs/common';
import { transformEmailData } from './teamplates/orderTeamplate';
import nodemailer from 'nodemailer';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }

  public async sendOrder(formDataOrderDto: any): Promise<void> {
    
    const emailData = transformEmailData(formDataOrderDto)
    console.log("emailData___", emailData);
    
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "mazarar@yandex.ru", // generated ethereal user
        pass: "gqgdgwqzxrbaqaxm" // generated ethereal password
    }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail(emailData)
    .then(() => {})
    .catch(error => console.log(error))
};
  
}
