import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import env from '../../config/env';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(env.KAFKA_CREATE_USER_TOPIC)
  async create(@Payload() createUserDto: CreateUserDto) {
    console.log('Kafka Create user consumer -> ', createUserDto);
    return this.userService.create(createUserDto);
  }

  @MessagePattern(env.KAFKA_CREATE_USER_TOPIC)
  async update(@Payload() updateUserDto: UpdateUserDto) {
    console.log('Kafka Update user consumer -> ', updateUserDto);
    return this.userService.update(updateUserDto.id, updateUserDto);
  }
}
