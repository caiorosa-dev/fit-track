import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
    email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
    password: string;
}
