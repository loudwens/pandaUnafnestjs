import { IsString, IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from './task-status.enum'; // Assurez-vous que ce chemin est correct

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsString()
  projectId?: string; // Assurez-vous que ce champ correspond à votre modèle

  @IsOptional()
  @IsString()
  assignedToId?: string; // Assurez-vous que ce champ correspond à votre modèle
}
