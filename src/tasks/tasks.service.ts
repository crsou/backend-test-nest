import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatusService } from '../task-status/task-status.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private repo: Repository<Task>,
    private statusService: TaskStatusService,
  ) {}

  async create(dto: CreateTaskDto) {
    const status = await this.statusService.findOne(dto.status);
    if (!status) throw new BadRequestException('Status not found');

    const newTask = this.repo.create({ ...dto, status });
    return this.repo.save(newTask);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateTaskDto) {
    const status = await this.statusService.findOne(dto.status);
    if (!status) throw new BadRequestException('Status not found');

    await this.repo.update(id, { ...dto, status });
    return this.repo.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
