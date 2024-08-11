import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './CreateUserDto';
import { UpdateUserDto } from './UpdateUserDto';
import * as bcrypt from 'bcrypt';
import { UserRole } from './user-role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(username: string, email: string, password: string, role: UserRole = UserRole.USER): Promise<User> {
    const newUser = this.userRepository.create({
      username,
      email,
      password,
      role,
    });

    return this.userRepository.save(newUser);
  }
  
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOneBy({ id });
    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    const deleteResult = await this.userRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
  
  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
  
}