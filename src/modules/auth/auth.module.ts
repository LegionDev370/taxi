import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EskizService } from './eskiz.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [AuthService, EskizService, ConfigService, JwtService],
})
export class AuthModule {}
