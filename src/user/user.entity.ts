import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsEmail, Length } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @Length(1, 50) // Validation pour la longueur de la chaîne
  name: string;

  @Column()
  @IsEmail() // Validation pour l'email
  email: string;
}
