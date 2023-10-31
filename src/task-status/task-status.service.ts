import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskStatusDto } from './dto/create-task-status.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from '../entities/task-status.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskStatusService {
  constructor(
    @InjectRepository(TaskStatus) private repo: Repository<TaskStatus>,
  ) {}

  create(dto: CreateTaskStatusDto) {
    const newStatus = this.repo.create(dto);
    return this.repo.save(newStatus);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const status = await this.repo.findOne({ where: { id } });
    if (!status) throw new BadRequestException('Status not found');
    return status;
  }

  async update(id: number, dto: UpdateTaskStatusDto) {
    await this.repo.update(id, dto);
    return this.repo.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
