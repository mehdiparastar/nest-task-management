import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getTasks(filterDTO: GetTasksFilterDTO) {
    return this.tasksRepository.getTasks(filterDTO);
  }

  getTaskById(id: string): Promise<Task> {
    return this.tasksRepository.getTaskById(id);
  }

  deleteTask(id: string): Promise<void> {
    return this.tasksRepository.deleteTask(id);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    return this.tasksRepository.updateTaskStatus(id, status);
  }

  createTask(createTaskDTO: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDTO);
  }
}
