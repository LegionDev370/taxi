import { Injectable } from '@nestjs/common';
import {
  CreateAuthCustomerDto,
  CreateAuthDriverDto,
} from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  registerCustomer(createAuthCustomerDto: CreateAuthCustomerDto) {}
  registerDriver(createAuthDriverDto: CreateAuthDriverDto) {}
}
