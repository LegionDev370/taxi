import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
export class LoginAuthDto {
  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phone_number: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
