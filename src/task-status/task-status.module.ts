import { Module } from '@nestjs/common';
import { TaskStatusService } from './task-status.service';
import { TaskStatusController } from './task-status.controller';
import { TaskStatus } from './entities/task-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TaskStatus])],
  controllers: [TaskStatusController],
  providers: [TaskStatusService],
})
export class TaskStatusModule {}
