import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto} from './user.dto';
import {UpdateUserDto } from './update-user.dto'
  import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Vérifier si l'email existe déjà
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException(`User with email ${createUserDto.email} already exists`);
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Créer un nouvel utilisateur
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // Vérifier si l'utilisateur existe
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Mettre à jour les champs
    if (updateUserDto.password) {
      // Hacher le nouveau mot de passe si fourni
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    
    // Appliquer les mises à jour
    await this.userRepository.update(id, updateUserDto);
    
    // Retourner l'utilisateur mis à jour
    return this.userRepository.findOne({
      where: { id: id },
    });
  }

  async delete(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
