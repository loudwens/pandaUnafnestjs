import { IsString, IsEmail, Length, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(1, 50, { message: 'Le nom doit contenir entre 1 et 50 caractères.' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'L\'adresse email n\'est pas valide.' })
  email?: string;

  @IsOptional()
  @IsString()
  @Length(6, 100, { message: 'Le mot de passe doit contenir entre 6 et 100 caractères.' })
  password?: string;
}
