import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Titre de la tâche',
    example: 'Développer une nouvelle fonctionnalité',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description détaillée de la tâche',
    example: 'Cette tâche concerne le développement de la fonctionnalité de recherche dans l\'application.',
    required: false,  
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Statut actuel de la tâche',
    example: 'En cours',
  })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({
    description: 'Nom du projet auquel la tâche appartient',
    example: 'Amélioration de l\'interface utilisateur',
  })
  @IsNotEmpty()
  @IsString()
  projectName: string;

  @ApiProperty({
    description: 'Nom d\'utilisateur de la personne assignée à la tâche',
    example: 'john.doe',
  })
  @IsNotEmpty()
  @IsString()
  username: string;
}
