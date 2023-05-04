import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { AddressService } from '../address/address.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly addressService: AddressService,
  ) {}

  async create({
    age,
    cep,
    email,
    name,
    number,
    password,
    phone,
  }: CreateUserDto): Promise<void> {
    const user = await this.userRepository.create({
      name,
      age,
      email,
      phone,
      password,
    });

    await this.addressService.create({
      user_id: user.id,
      cep,
      number,
    });
  }

  async update(
    id: number,
    { name, age, email, phone, password }: UpdateUserDto,
  ): Promise<void> {
    await this.userRepository.update(id, { name, age, email, phone, password });
  }
}
