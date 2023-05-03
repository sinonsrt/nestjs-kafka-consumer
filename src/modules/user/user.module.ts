import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaService } from 'src/shared/prisma/prisma.service';

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
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
