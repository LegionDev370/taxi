import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { RedisService } from '../auth/redis.service';

@Injectable()
export class CustomersService {
  constructor(
    private mailService: MailerService,
    @InjectRepository(Customer)
    private customerRespository: Repository<Customer>,
    private redisService: RedisService,
  ) {}
  async sendMailVerificationCode(userId: number) {
    const customer = await this.customerRespository.findOne({
      where: { id: userId },
    });
    if (!customer?.email) throw new BadRequestException('email invalid');
    const link = await this.redisService.sendEmailVerificationCode(
      customer.email,
    );
    await this.mailService.sendMail({
      to: `${customer?.email}`,
      subject: `How to Send Emails with Nodemailer`,
      text: link,
    });
    return {
      message: 'verification code email sended',
    };
  }
  async verifyEmail(token: string) {
    const tokenKey = `verification-email:${token}`;
    const email = await this.redisService.getKey(tokenKey);
    if (!email) throw new HttpException('email verification link expired', 410);
    const user = JSON.parse(email as string);
    await this.customerRespository.update(
      { email: user.email },
      { is_email_verified: true },
    );
    await this.redisService.delKey(tokenKey);
    await this.redisService.delKey(`email-tokens:${user.email}`);
  }
}
