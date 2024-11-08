import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: 'User email address',
    example: 'updated_user@example.com',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'User password',
    example: 'newpassword123',
  })
  password?: string;

  @ApiPropertyOptional({ description: 'User full name', example: 'Jane Doe' })
  name?: string;

  @ApiPropertyOptional({
    description: 'User role',
    enum: UserRole,
  })
  role?: UserRole;
}
