import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import AuthGuard from 'src/common/guards/auth.guard';
import { CustomersService } from './customers.service';

interface IRequest extends Request {
  userId: number;
}

@Controller('customers')
@UseGuards(AuthGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}
  getProfile() {}
  @Get('/verify/email')
  verifyEmail() {}
  @Get('/send-email/verification-code')
  async sendMailVerificationCode(@Req() req: IRequest) {
    const user_id = req.userId;
    return await this.customersService.sendMailVerificationCode(user_id);
  }
}
