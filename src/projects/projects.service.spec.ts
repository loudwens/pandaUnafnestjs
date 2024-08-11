import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './create-project.dto';
import { Project } from './project.entity/project.entity';
import { UpdateProjectDto } from './update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  public async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectsRepository.create(createProjectDto);
    return this.projectsRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['members'],
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<void> {
    const result = await this.projectsRepository.update(id, updateProjectDto);
    if (result.affected === 0) {
      throw new NotFoundException('Project not found');
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.projectsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Project not found');
    }
  }

  // Méthodes addMember et removeMember...
}
