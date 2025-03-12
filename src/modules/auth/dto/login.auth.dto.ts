import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
export class LoginCustomerAuthDto {
  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phone_number: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
