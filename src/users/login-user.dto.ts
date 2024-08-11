import { IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @MinLength(1, { message: 'Username is required' })
  username: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
