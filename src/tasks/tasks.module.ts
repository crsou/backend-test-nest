import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from '../entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskStatusService } from 'src/task-status/task-status.service';
import { TaskStatus } from 'src/entities/task-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskStatus])],
  controllers: [TasksController],
  providers: [TasksService, TaskStatusService],
})
export class TasksModule {}
