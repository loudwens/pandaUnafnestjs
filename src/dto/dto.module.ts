import { Module } from '@nestjs/common';
import { CreateUserDto } from '../users/CreateUserDto';
import { UpdateUserDto } from '../users/UpdateUserDto';
import { LoginUserDto } from '../users/login-user.dto';

@Module({
  exports: [CreateUserDto, UpdateUserDto, LoginUserDto],
})
export class DtoModule {}
