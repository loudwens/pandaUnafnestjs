import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly username?: string;

  @IsOptional()
  @IsString()
  readonly password?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;
}
