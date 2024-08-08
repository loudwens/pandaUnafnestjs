import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 50, { message: 'Le nom doit contenir entre 1 et 50 caractères.' })
  name: string;

  @IsEmail({}, { message: 'L\'adresse email n\'est pas valide.' })
  email: string;
}

export class UpdateUserDto {
  @IsString()
  @Length(1, 50, { message: 'Le nom doit contenir entre 1 et 50 caractères.' })
  name?: string;

  @IsEmail({}, { message: 'L\'adresse email n\'est pas valide.' })
  email?: string;
}
