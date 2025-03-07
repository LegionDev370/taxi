import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UpdateCustomerDetailsDto {
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsEmail()
  email: string;
}

export class CreateAuthCustomerDto {
  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phone_number: string;
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
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
