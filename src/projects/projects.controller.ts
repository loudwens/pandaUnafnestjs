import { Controller, Post, Body, Get, Param, Patch, Delete, NotFoundException } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './create-project.dto';
import { Project } from './project.entity/project.entity';
import { UpdateProjectDto } from './update-project.dto';
import { User } from 'src/users/user.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Project> {
    const project = await this.projectsService.findOne(+id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto): Promise<void> {
    await this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.projectsService.remove(+id);
  }


  @Post(':projectName/members/:username')
  addMember(@Param('projectName') projectName: string, @Param('username') username: string) {
    return this.projectsService.addMember(projectName, username);
  }

  @Delete(':id/members/:userId')
  async removeMember(
    @Param('id') projectId: number,
    @Param('userId') userId: number,
  ): Promise<Project> {
    return this.projectsService.removeMember(projectId, userId);
  }
  @Get(':id/members')
  async getProjectMembers(@Param('id') id: number): Promise<User[]> {
    return this.projectsService.getProjectMembers(id);
  }
}
