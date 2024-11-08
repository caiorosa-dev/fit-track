import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @ApiProperty({
    description: 'User email for sign-in',
    example: 'user@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({
    description: 'User password for sign-in',
    example: 'securePassword123',
    minLength: 3,
  })
  password: string;
}
