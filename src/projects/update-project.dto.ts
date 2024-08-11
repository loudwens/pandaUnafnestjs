import { IsString, IsOptional } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  name?: string;

  // Ajoutez d'autres propriétés si nécessaire
}
