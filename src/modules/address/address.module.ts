import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressRepository } from './address.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
  controllers: [AddressController],
  providers: [AddressService, AddressRepository, PrismaService],
  exports: [AddressRepository],
})
export class AddressModule {}
