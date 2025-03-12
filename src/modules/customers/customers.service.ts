import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
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
      where: { id: +userId },
    });
    if (!customer?.email) throw new BadRequestException('email invalid');
    await this.mailService.sendMail({
      to: `${customer?.email}`,
      subject: `How to Send Emails with Nodemailer`,
      text: 'Salom',
    });
  }
}
