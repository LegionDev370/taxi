import { Controller, Get, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    private mailService: MailerService,
  ) {}
  getProfile() {}
  @Get('/verify/email')
  verifyEmail() {}
  @Post('/send-mail/verification-code')
  sendMailVerificationCode() {
    this.mailService.sendMail({
      from: 'Suhrobekdan',
      to: 'muhammadaminergashev09@gmail.com',
      subject: `How to Send Emails with Nodemailer`,
      text: 'Salom',
    });
  }
}
