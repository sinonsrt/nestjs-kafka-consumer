import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UserRepository } from './user.repository';
import { AddressService } from '../address/address.service';
import { AddressModule } from '../address/address.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user',
            brokers: ['http://localhost:9092'],
          },
          consumer: {
            groupId: 'user-consumer',
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),
    AddressModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService, AddressService],
})
export class UserModule {}
