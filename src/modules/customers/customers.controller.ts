import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import AuthGuard from 'src/common/guards/auth.guard';
import { CustomersService } from './customers.service';

interface IRequest extends Request {
  userId: number;
}

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}
  getProfile() {}
  @Get('/verify/email')
  async verifyEmail(@Query('token') token: string) {
    return await this.customersService.verifyEmail(token);
  }
  @Get('/send-email/verification-code')
  @UseGuards(AuthGuard)
  async sendMailVerificationCode(@Req() req: IRequest) {
    const user_id = req.userId;
    return await this.customersService.sendMailVerificationCode(user_id);
  }
}
