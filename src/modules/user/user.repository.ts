import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<void> {
    await this.prisma.user.create({
      data,
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<void> {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
  }
}
