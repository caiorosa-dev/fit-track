import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateUserDto): Promise<User> {
    const hashedPassword = await hash(data.password, 11);

    // SQL: INSERT INTO users (email, password, name) VALUES (<email>, <hashedPassword>, <name>);
    return this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
  }

  async findAll(): Promise<User[]> {
    // SQL: SELECT * FROM users;
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User | null> {
    // SQL: SELECT * FROM users WHERE id = <id>;
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    // SQL: SELECT * FROM users WHERE email = <email>;
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    if (data.password) {
      data.password = await hash(data.password, 11);
    }

    // SQL: UPDATE users SET <fields> WHERE id = <id>;
    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: number): Promise<User> {
    // SQL: DELETE FROM users WHERE id = <id>;
    return this.prisma.user.delete({ where: { id } });
  }
}
