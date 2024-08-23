import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Project, User, ProjectMember } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(name: string, description?: string): Promise<Project> {
    return this.prisma.project.create({
      data: { name, description },
    });
  }

  async findAll(): Promise<Project[]> {
    return this.prisma.project.findMany();
  }

  async findOneById(id: number): Promise<Project> {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async findByName(name: string): Promise<Project[]> {
    const projects = await this.prisma.project.findMany({
      where: { name },
    });

    if (projects.length === 0) {
      throw new NotFoundException(`No projects found with name ${name}`);
    }

    return projects;
  }

  async update(id: number, name?: string, description?: string): Promise<Project> {
    const project = await this.prisma.project.update({
      where: { id },
      data: { name, description },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async remove(id: number): Promise<Project> {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(`Le Projet avec l'id ${id} n'a pas été trouvé.`);
    }

    return this.prisma.project.delete({
      where: { id },
    });
  }
  async addMemberToProject(projectName: string, username: string): Promise<{ projectName: string; username: string }> {
    console.log('Received projectName:', projectName);
    console.log('Received username:', username);
  
    // Vérifiez si projectName est défini et que le projet existe
    const project = await this.prisma.project.findFirst({
      where: {
        name: projectName,
      },
    });
  
    if (!project) {
      throw new NotFoundException(`Project with name ${projectName} not found`);
    }
  
    // Assurez-vous que username est défini
    if (!username) {
      throw new BadRequestException('Username must be provided');
    }
  
    // Trouvez l'utilisateur avec le nom d'utilisateur fourni
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
  
    // Ajoutez l'utilisateur au projet
    await this.prisma.projectMember.create({
      data: {
        userId: user.id,
        projectId: project.id,
        role: 'Member',
      },
    });
  
    // Retournez les informations demandées
    return {
      projectName: project.name,
      username: user.username,
    };
  }
  
  
  
  // Afficher les membres d'un projet
  async getProjectMembers(projectName: string): Promise<ProjectMember[]> {
    const project = await this.prisma.project.findFirst({
      where: { name: projectName },
      include: { projectMembers: { include: { user: true } } },
    });

    if (!project) {
      throw new NotFoundException(`Project with name ${projectName} not found`);
    }

    return project.projectMembers;
  }
  
  async getProjectsByUsername(username: string) {
    // Trouver l'utilisateur avec les projets auxquels il participe
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: {
        projectMembers: {
          include: {
            project: true, // Inclure les détails du projet
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    // Extraire les projets avec les noms de projet et les noms d'utilisateur
    const projects = user.projectMembers.map(member => ({
      projectName: member.project.name, // Nom du projet
      username: user.username,          // Nom de l'utilisateur
    }));

    return projects;
  }
  // Supprimer un membre d'un projet
  async removeMemberFromProject(projectName: string, username: string): Promise<ProjectMember> {
    // Rechercher le projet par son nom
    const project = await this.prisma.project.findFirst({
      where: { name: projectName },
      include: { projectMembers: true },
    });

    if (!project) {
      throw new NotFoundException(`Project with name ${projectName} not found`);
    }

    // Rechercher l'utilisateur par son nom d'utilisateur
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    // Trouver le membre du projet à supprimer
    const projectMember = project.projectMembers.find(
      (member) => member.userId === user.id
    );

    if (!projectMember) {
      throw new NotFoundException(`User with username ${username} is not a member of the project ${projectName}`);
    }

    // Supprimer le membre du projet
    return this.prisma.projectMember.delete({
      where: { id: projectMember.id },
    });
  }async updateMemberInProject(projectName: string, username: string, newRole: string): Promise<ProjectMember> {
    // Rechercher le projet par son nom
    const project = await this.prisma.project.findFirst({
      where: { name: projectName },
      include: { projectMembers: true },
    });
  
    if (!project) {
      throw new NotFoundException(`Project with name ${projectName} not found`);
    }
  
    // Rechercher l'utilisateur par son nom d'utilisateur
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
  
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
  
    // Trouver le membre du projet à mettre à jour
    const projectMember = project.projectMembers.find(
      (member) => member.userId === user.id
    );
  
    if (!projectMember) {
      throw new NotFoundException(`User with username ${username} is not a member of the project ${projectName}`);
    }
  
    // Mettre à jour le rôle du membre du projet
    return this.prisma.projectMember.update({
      where: { id: projectMember.id },
      data: { role: newRole }, // Assurez-vous que le modèle ProjectMember a un champ 'role'
    });
  }
  
}
