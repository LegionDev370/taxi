import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../customers/entities/customer.entity';
import { Driver } from '../drivers/entities/driver.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RedisService } from './redis.service';
import { SmsProviderService } from './sms.provider.service';
import SmsLimiterService from './sms.limiter.service';
@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Customer, Driver])],
  controllers: [AuthController],
  providers: [
    AuthService,
    ConfigService,
    JwtService,
    RedisService,
    SmsProviderService,
    SmsLimiterService,
  ],
})
export class AuthModule {}
