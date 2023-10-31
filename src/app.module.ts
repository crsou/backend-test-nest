import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskStatusModule } from './task-status/task-status.module';
import { dataSourceOptions } from './db/data-source';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    TaskStatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
