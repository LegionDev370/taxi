import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateAuthCustomerDto {
  @IsString()
  @MinLength(3)
  @MaxLength(15)
  @IsNotEmpty()
  username: string;
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phone_number: string;
  @IsEmail()
  email: string;
}
export class CreateAuthDriverDto {
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsPhoneNumber('UZ')
  phone_number: string;
  @IsEmail()
  @IsOptional()
  email: string;
}
