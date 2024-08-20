import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<{ message: string; task: Task }> {
    const { title, description, status, projectName, username } = createTaskDto;

    if (!username) {
      throw new BadRequestException('Username must be provided');
    }

    const project = await this.prisma.project.findFirst({
      where: { name: projectName },
    });

    if (!project) {
      throw new NotFoundException(`Project with name ${projectName} not found`);
    }

    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    const task = await this.prisma.task.create({
      data: {
        title,
        description,
        status,
        projectId: project.id,
        userId: user.id,
      },
    });

    return { message: 'Task successfully created', task };
  }

  async getAllTasks(): Promise<{ message: string; tasks: Task[] }> {
    const tasks = await this.prisma.task.findMany({
      include: {
        user: true,     
        project: true,  
      },
    });

    return { message: 'Tasks retrieved successfully', tasks };
  }

  async getTaskById(id: number): Promise<{ message: string; task: Task }> {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        user: true,      
        project: true, 
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return { message: 'Task retrieved successfully', task };
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<{ message: string; task: Task }> {
    const task = await this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });

    return { message: 'Task successfully updated', task };
  }

  async deleteTask(id: number): Promise<{ message: string }> {
    await this.prisma.task.delete({
      where: { id },
    });

    return { message: 'Task successfully deleted' };
  }
}
