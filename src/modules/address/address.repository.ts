import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { AddressEntity } from './entities/address.entity';
import { Address } from '@prisma/client';

@Injectable()
export class AddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({ user_id, ...data }: AddressEntity): Promise<Address> {
    return this.prisma.address.create({
      data: {
        ...data,
        User: {
          connect: {
            id: user_id,
          },
        },
      },
    });
  }

  async update(id: number, data: AddressEntity): Promise<void> {
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
