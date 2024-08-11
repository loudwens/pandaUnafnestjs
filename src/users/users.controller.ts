import { Body, ConflictException, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./CreateUserDto";
import { UserRole } from './user-role.enum';

import { UpdateUserDto } from "./UpdateUserDto";


import { User } from "./user.entity";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { username, email, password, role } = createUserDto;

    // Vérifier si le rôle est défini et valide, sinon utiliser UserRole.USER
    const userRole: UserRole = role && Object.values(UserRole).includes(role as UserRole)
      ? (role as UserRole)
      : UserRole.USER;

    return this.usersService.createUser(username, email, password, userRole);
  }
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}