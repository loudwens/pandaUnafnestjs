import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateProjectDto {
  @ApiProperty({
    description: 'Nom du projet à mettre à jour',
    example: 'Amélioration de l\'interface utilisateur',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Description du projet à mettre à jour',
    example: 'Ce projet vise à améliorer l\'interface utilisateur de l\'application.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
