// src/users/dto/create-user.dto.ts

import { IsString, IsEmail, IsOptional } from 'class-validator';
import { UserRole } from './user-role.enum'; // Assurez-vous que c'est le bon chemin

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsOptional()
  readonly role?: UserRole;
}
