import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { User } from '@prisma/client';
@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: UserEntity): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async update(id: number, data: UserEntity): Promise<void> {
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
