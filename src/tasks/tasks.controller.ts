import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Taches')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'ajouter un tache tâches' })
  @UseGuards(AuthGuard('jwt'))
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtenir toutes les tâches' })
  @UseGuards(AuthGuard('jwt'))
  async getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une tâche par ID' })
  @ApiResponse({ status: 404, description: 'Tâche non trouvée' })
  @UseGuards(AuthGuard('jwt'))
  async getTaskById(@Param('id') id: number) {
    return this.tasksService.getTaskById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une tâche par son ID' })
  @UseGuards(AuthGuard('jwt'))
  async updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une tâche par son ID' })
  @ApiResponse({ status: 200, description: 'Tâche supprimée' })
  @UseGuards(AuthGuard('jwt'))
  async deleteTask(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }
}
