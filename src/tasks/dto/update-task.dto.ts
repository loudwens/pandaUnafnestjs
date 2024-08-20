import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto'; // Assurez-vous que ce fichier existe

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    description: 'Titre de la tâche',
    example: 'Développer une fonctionnalité de recherche',
    required: false, // Le titre est optionnel pour une mise à jour
  })
  title?: string;

  @ApiProperty({
    description: 'Description détaillée de la tâche',
    example: 'Ajouter la fonctionnalité de recherche avancée',
    required: false, // La description est optionnelle pour une mise à jour
  })
  description?: string;

  @ApiProperty({
    description: 'Statut actuel de la tâche',
    example: 'Complète',
    required: false, // Le statut est optionnel pour une mise à jour
  })
  status?: string;

  @ApiProperty({
    description: 'Nom du projet auquel la tâche appartient',
    example: 'Refonte de l\'interface utilisateur',
    required: false, // Le nom du projet est optionnel pour une mise à jour
  })
  projectName?: string;

  @ApiProperty({
    description: 'Nom d\'utilisateur de la personne assignée à la tâche',
    example: 'jane.doe',
    required: false, // Le nom d'utilisateur est optionnel pour une mise à jour
  })
  username?: string;
}
