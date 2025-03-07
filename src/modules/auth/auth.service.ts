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
  customer: any;
  driver: any;
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
    if (findCustomer) throw new UnauthorizedException('invalid credentials');
    const hashedPassword = await bcrypt.hash(
      createAuthCustomerDto.password,
      12,
    );
    const customer = this.customerRepository.create({
      ...createAuthCustomerDto,
      password: hashedPassword,
    });
    this.customer = customer;
    this.redisService.setOtp(
      customer.phone_number,
      this.redisService.generateOtpPassword(),
      25,
    );
    const otp_password = await this.redisService.getOtp(customer.phone_number);
    return {
      otp_password,
    };
  }

  async verifyOtpCustomer(code: string) {
    const otp = await this.redisService.getOtp(`${this.customer.phone_number}`);
    if (!otp) {
      throw new UnauthorizedException('invalid code');
    }
    if (code !== otp) throw new UnauthorizedException('invalid code');
    const customer = await this.customerRepository.save(this.customer);
    const token = await this.jwtService.signAsync(
      { user_id: customer.id },
      { expiresIn: '2h', secret: this.configService.get('JWT_SECRET_KEY') },
    );
    this.customer = null;
    return {
      token,
    };
  }

  registerDriver(createAuthDriverDto: CreateAuthDriverDto) {}
}
