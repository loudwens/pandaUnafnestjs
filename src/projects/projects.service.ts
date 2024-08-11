import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from './project.entity/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProjectDto } from './update-project.dto';
import { CreateProjectDto } from './create-project.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectsRepository.create(createProjectDto);
    return this.projectsRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async findOne(id: number): Promise<Project> {
    return this.projectsRepository.findOneBy({ id });
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

  async addMember(projectName: string, username: string): Promise<Project> {
    // Trouver le projet par nom et charger les membres existants
    const project = await this.projectsRepository.findOne({
      where: { name: projectName },
      relations: ['members'],
    });
  
    if (!project) {
      throw new NotFoundException('Project not found');
    }
  
    // Trouver l'utilisateur par nom d'utilisateur
    const user = await this.usersRepository.findOne({
      where: { username: username },
    });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    // Ajouter l'utilisateur au projet
    project.members.push(user);
    return this.projectsRepository.save(project);
  }
  
  

  async removeMember(projectId: number, userId: number): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id: projectId },
      relations: ['members'],
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    project.members = project.members.filter(member => member.id !== userId);
    return this.projectsRepository.save(project);
  }
  
  async getProjectMembers(projectId: number): Promise<User[]> {
    const project = await this.projectsRepository.findOne({
      where: { id: projectId },
      relations: ['members'],
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project.members;
  }
}
