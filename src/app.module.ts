import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { AddressModule } from './modules/address/address.module';

@Module({
  imports: [UserModule, PrismaModule, AddressModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
