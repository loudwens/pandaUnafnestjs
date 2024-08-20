import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddMemberDto {
  @ApiProperty({
    description: 'Nom d\'utilisateur de l\'utilisateur à ajouter',
    example: 'john_doe',
  })
  @IsString()
  readonly username: string;
}
