import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Customer } from '../customers/entities/customer.entity';
import { Driver } from '../drivers/entities/driver.entity';
import {
  CreateAuthCustomerDto,
  CreateAuthDriverDto,
} from './dto/create-auth.dto';
import { RedisService } from './redis.service';
import { ConfigService } from '@nestjs/config';
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
    this.redisService.setOtp(
      createAuthCustomerDto.phone_number,
      otpPassword,
      25,
    );
    this.redisService.setTempUser({
      phone_number: createAuthCustomerDto.phone_number,
      password: hashedPassword,
    });
    return {
      otp: otpPassword,
    };
  }

  async verifyOtpCustomer(phone_number: string, code: string) {
    const tempUser = await this.redisService.getOtp(
      `temp_user:${phone_number}`,
    );
    const otp = await this.redisService.getOtp(`user:${phone_number}`);
    if (!tempUser || !otp) {
      throw new UnauthorizedException('invalid code');
    }
    if (code !== otp) throw new UnauthorizedException('invalid code');
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

  registerDriver(createAuthDriverDto: CreateAuthDriverDto) {}
}
