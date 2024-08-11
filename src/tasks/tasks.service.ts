import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity/task.entity';
import { User } from '../users/user.entity';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';
import { TaskStatus } from './task-status.enum'; // Assurez-vous que vous avez défini cet enum

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    // Crée un objet Task en utilisant le DTO
    const newTask = this.tasksRepository.create(createTaskDto);
    // Sauvegarde de l'objet Task
    return this.tasksRepository.save(newTask);
  }

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['assignedTo'], // Assurez-vous que la relation est correcte
    });
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }

  async assignTask(taskId: number, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId },
      relations: ['assignedTo'],
    });
    if (!task) throw new Error('Task not found');
    task.assignedTo = user; // Assurez-vous que la relation est correctement définie
    return this.tasksRepository.save(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.tasksRepository.update(id, updateTaskDto);
    return this.tasksRepository.findOneBy({ id });
  }

  async updateStatus(id: number, status: TaskStatus): Promise<Task> {
    await this.tasksRepository.update(id, { status });
    return this.tasksRepository.findOneBy({ id });
  }
  async updateTaskStatus(id: number, status: string): Promise<void> {
    try {
      const result = await this.tasksRepository.update(id, { status });
      if (result.affected === 0) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to update task status');
    }
  }
  
}
