import { IsString, IsEmail, Length, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 50, { message: 'Le nom doit contenir entre 1 et 50 caractères.' })
  nom: string;

  @IsString()
  @Length(1, 50, { message: 'Le prénom doit contenir entre 1 et 50 caractères.' })
  prenom: string;

  @IsEmail({}, { message: 'L\'adresse email n\'est pas valide.' })
  email: string;

  @IsString()
  @Length(6, 100, { message: 'Le mot de passe doit contenir entre 6 et 100 caractères.' })
  password: string;
}
