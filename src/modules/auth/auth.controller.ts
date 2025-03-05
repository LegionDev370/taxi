import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateAuthCustomerDto,
  CreateAuthDriverDto,
} from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login.auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('customer/register')
  registerCustomer(@Body() createAuthCustomerDto: CreateAuthCustomerDto) {
    return this.authService.registerCustomer(createAuthCustomerDto);
  }

  @Post('driver/register')
  registerDriver(@Body() createAuthDriverDto: CreateAuthDriverDto) {
    // return this.authService.registerDriver(createAuthDto);
  }

  @Post('customer/login')
  loginCustomer(@Body() createAuthDto: LoginAuthDto) {
    // return this.authService.create(createAuthDto);
  }
  @Post('driver/login')
  loginDriver(@Body() createAuthDto: LoginAuthDto) {
    // return this.authService.create(createAuthDto);
  }
}
