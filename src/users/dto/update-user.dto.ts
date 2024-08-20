import { IsString, IsEmail, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @Length(6, 100)
  @IsOptional()
  password?: string;

  @IsString()
  @Length(1, 50)
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  role?: string;
}
