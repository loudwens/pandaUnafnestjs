import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from './task-status.enum';

export class UpdateTaskDto {
    
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  projectId?: number; // Si vous souhaitez permettre la modification du projet associé

  @IsOptional()
  assignedToId?: number; // Si vous souhaitez permettre la modification de l'utilisateur assigné
}
