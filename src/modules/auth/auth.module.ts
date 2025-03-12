import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EskizService } from './eskiz.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../customers/entities/customer.entity';
import { Driver } from '../drivers/entities/driver.entity';
import { RedisService } from './redis.service';
import AuthGuard from 'src/common/guards/auth.guard';
@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Customer, Driver])],
  controllers: [AuthController],
  providers: [
    AuthService,
    EskizService,
    ConfigService,
    JwtService,
    RedisService,
  ],
})
export class AuthModule {}
