import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Nom du projet',
    example: 'Développement d\'une nouvelle fonctionnalité',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description du projet',
    example: 'Ce projet implique le développement de nouvelles fonctionnalités pour l\'application.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
