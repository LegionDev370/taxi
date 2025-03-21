import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { Customer } from '../customers/entities/customer.entity';
import { Driver } from '../drivers/entities/driver.entity';
import {
  CreateAuthCustomerDto,
  CreateAuthDriverDto,
} from './dto/create-auth.dto';
import { RedisService } from './redis.service';
import { ConfigService } from '@nestjs/config';
import { SmsProviderService } from './sms.provider.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
    private redisService: RedisService,
    private configService: ConfigService,
    private readonly smsProviderService: SmsProviderService,
  ) {}
  async registerCustomer(createAuthCustomerDto: CreateAuthCustomerDto) {
    const findCustomer = await this.customerRepository.findOne({
      where: {
        phone_number: createAuthCustomerDto.phone_number,
      },
    });
    const hashedPassword = await bcrypt.hash(
      createAuthCustomerDto.password,
      12,
    );
    if (findCustomer) throw new UnauthorizedException('invalid credentials');
    const otpPassword = this.redisService.generateOtpPassword();
    try {
      await this.smsProviderService.login();
      const response = await this.smsProviderService.sendSms({
        phone_number: createAuthCustomerDto.phone_number,
        otp: otpPassword,
      });
      if (response == 'waiting') {
        await this.redisService.setOtp(
          createAuthCustomerDto.phone_number,
          otpPassword,
          60,
        );
        await this.redisService.setTempUser({
          phone_number: createAuthCustomerDto.phone_number,
          password: hashedPassword,
        });
        return {
          otp: otpPassword,
        };
      }
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async verifyOtpCustomer(phone_number: string, code: string) {
    const tempUser = await this.redisService.getOtp(
      `temp_user:${phone_number}`,
    );
    const otp = await this.redisService.getOtp(`user:${phone_number}`);
    if (!tempUser || !otp) {
      throw new UnauthorizedException('invalid code');
    }
    if (code !== otp) {
      this.redisService.setIncrementKey(phone_number);
      const attemptCode = await this.redisService.getOtp(
        `attempts_user:${phone_number}`,
      );
      if (+(attemptCode as string) > 5) {
        throw new UnauthorizedException('to many attempts');
      }
      throw new UnauthorizedException('invalid code');
    }
    const user = JSON.parse(tempUser);
    const customer = await this.customerRepository.save(user);
    const token = await this.jwtService.signAsync(
      { user_id: customer.id },
      { expiresIn: '2h', secret: this.configService.get('JWT_SECRET_KEY') },
    );
    this.redisService.delOtp(phone_number);
    this.redisService.delTempUser(phone_number);
    return {
      token,
    };
  }
  async loginCustomer(phone_number: string, password: string) {
    try {
      const findCustomer = await this.customerRepository.findOne({
        where: {
          phone_number: phone_number,
        },
      });
      if (!findCustomer) throw new UnauthorizedException('user not found');
      const comparePassword = await bcrypt.compare(
        password,
        findCustomer.password,
      );
      if (!comparePassword)
        throw new UnauthorizedException('phone_number or password incorrect');
      const token = this.jwtService.sign(
        { user_id: findCustomer.id },
        {
          expiresIn: '1h',
          secret: this.configService.get('JWT_SECRET_KEY'),
        },
      );
      return { token };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
  registerDriver(createAuthDriverDto: CreateAuthDriverDto) {}
}
