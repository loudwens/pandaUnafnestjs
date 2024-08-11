import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity/task.entity';
import { UpdateTaskDto } from './update-task.dto';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/users/user.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: any): Promise<Task> {
    // Assurez-vous que 'createTaskDto' est correctement typé
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: TaskStatus): Promise<Task> {
    return this.tasksService.updateStatus(+id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(+id);
  }

  @Post(':id/assign')
  assignTask(@Param('id') id: string, @Body() user: User): Promise<Task> {
    return this.tasksService.assignTask(+id, user);
  }
}
