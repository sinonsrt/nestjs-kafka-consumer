import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    await this.userRepository.create(createUserDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.userRepository.update(id, updateUserDto);
  }
}
