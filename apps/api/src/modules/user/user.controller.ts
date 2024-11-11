import {
  Controller,
  Get,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './user.service';
import { AuthenticatedUser } from 'src/shared/decorators/authenticated-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('me')
  me(@AuthenticatedUser() auth: AuthenticatedUser) {
    return this.userService.findOne(auth.id);
  }

  @Put()
  update(@AuthenticatedUser() auth: AuthenticatedUser, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(auth.id, updateUserDto);
  }
}
