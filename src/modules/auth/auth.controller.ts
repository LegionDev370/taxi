import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateAuthCustomerDto,
  CreateAuthDriverDto,
} from './dto/create-auth.dto';
import { LoginCustomerAuthDto } from './dto/login.auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('customer/register')
  @HttpCode(200)
  registerCustomer(@Body() createAuthCustomerDto: CreateAuthCustomerDto) {
    return this.authService.registerCustomer(createAuthCustomerDto);
  }
  @Post('/verify/code')
  verifyCode(@Body() body: { phone_number: string; code: string }) {
    return this.authService.verifyOtpCustomer(body.phone_number, body.code);
  }
  @Post('driver/register')
  registerDriver(@Body() createAuthDriverDto: CreateAuthDriverDto) {
    // return this.authService.registerDriver(createAuthDto);
  }

  @Post('customer/login')
  @HttpCode(200)
  async loginCustomer(
    @Body() loginCustomerAuthDto: LoginCustomerAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token } = await this.authService.loginCustomer(
      loginCustomerAuthDto.phone_number,
      loginCustomerAuthDto.password,
    );
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
    });
    return { token };
  }
  // @Post('driver/login')
  // loginDriver(@Body() createAuthDto: LoginAuthDto) {
  //   // return this.authService.create(createAuthDto);
  // }
}
