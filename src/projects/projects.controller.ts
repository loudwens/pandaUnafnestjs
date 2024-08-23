import { Controller, Post, Get, Delete, Put, Param, Body, NotFoundException, Query, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectMember } from '@prisma/client';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau projet' })
  @ApiResponse({ status: 201, description: 'Projet créé avec succès.' })
  @UseGuards(AuthGuard('jwt'))

  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto.name, createProjectDto.description);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les projets' })
  
  @ApiResponse({ status: 200, description: 'Liste des projets récupérée avec succès.' })
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un projet par son ID' })
  @ApiResponse({ status: 200, description: 'Projet récupéré avec succès.' })
  @ApiResponse({ status: 404, description: 'Projet non trouvé.' })
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: number) {
    const project = await this.projectsService.findOneById(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'Récupérer un projet par son nom' })
  @ApiResponse({ status: 200, description: 'Projet récupéré avec succès.' })
  @ApiResponse({ status: 404, description: 'Projet non trouvé.' })
  @UseGuards(AuthGuard('jwt'))
  async findByName(@Param('name') name: string) {
    const project = await this.projectsService.findByName(name);
    if (!project) {
      throw new NotFoundException(`Project with name ${name} not found`);
    }
    return project;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un projet' })
  @ApiResponse({ status: 200, description: 'Projet mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Projet non trouvé.' })
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
    const project = await this.projectsService.update(id, updateProjectDto.name, updateProjectDto.description);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un projet' })
  @ApiResponse({ status: 200, description: 'Projet supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Projet non trouvé.' })
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: number) {
    const project = await this.projectsService.remove(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return { message: 'Project successfully deleted' };
  }

  @Post('addMember')
  @ApiOperation({ summary: 'Ajouter un membre à un projet' })
  @ApiResponse({ status: 201, description: 'Membre ajouté au projet avec succès.' })
  @ApiResponse({ status: 404, description: 'Projet ou utilisateur non trouvé.' })
  @UseGuards(AuthGuard('jwt'))
  async addMember(
    @Body() body: { projectName: string; username: string }
  ) {
    const { projectName, username } = body;
    return this.projectsService.addMemberToProject(projectName, username);
  }

  @Get(':projectName/members')
  @ApiOperation({ summary: 'Récupérer les membres d\'un projet' })
  @ApiResponse({ status: 200, description: 'Liste des membres récupérée avec succès.' })
  @ApiResponse({ status: 404, description: 'Projet non trouvé.' })
  @UseGuards(AuthGuard('jwt'))
  async getProjectMembers(@Param('projectName') projectName: string) {
    return this.projectsService.getProjectMembers(projectName);
  }

  @Delete(':projectName/members/:username')
  @ApiOperation({ summary: 'Supprimer un membre d\'un projet' })
  @ApiResponse({ status: 200, description: 'Membre supprimé du projet avec succès.' })
  @ApiResponse({ status: 404, description: 'Projet ou membre non trouvé.' })
  @UseGuards(AuthGuard('jwt'))
  async removeMemberFromProject(
    @Param('projectName') projectName: string,
    @Param('username') username: string
  ): Promise<ProjectMember> {
    const projectMember = await this.projectsService.removeMemberFromProject(projectName, username);
    if (!projectMember) {
      throw new NotFoundException(`Unable to remove member ${username} from project ${projectName}`);
    }
    return projectMember;
  }
  @Get('user/:username')
  async getProjectsByUser(@Param('username') username: string) {
    return this.projectsService.getProjectsByUsername(username);
  }

  @Put(':projectName/members')
  @ApiOperation({ summary: 'Mettre à jour un membre dans un projet' })
  @ApiResponse({ status: 200, description: 'Membre mis à jour dans le projet avec succès.' })
  @ApiResponse({ status: 404, description: 'Projet ou membre non trouvé.' })
  @UseGuards(AuthGuard('jwt'))
  async updateMember(
    @Param('projectName') projectName: string,
    @Body() updateMemberDto: { username: string; newUsername: string }
  ) {
    return this.projectsService.updateMemberInProject(projectName, updateMemberDto.username, updateMemberDto.newUsername);
  }
}
