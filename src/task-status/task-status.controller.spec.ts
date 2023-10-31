/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { TaskStatusController } from './task-status.controller';
import { TaskStatusService } from './task-status.service';
import * as supertest from 'supertest';
import { Repository } from 'typeorm';
import { TaskStatus } from '../entities/task-status.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TaskStatusController', () => {
  let controller: TaskStatusController;
  let service: TaskStatusService;
  let repo: Repository<TaskStatus>;
  const repoToken = getRepositoryToken(TaskStatus);
  const url = 'http://localhost:3000';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskStatusController],
      providers: [
        TaskStatusService,
        {
          provide: repoToken,
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TaskStatusService>(TaskStatusService);
    controller = module.get<TaskStatusController>(TaskStatusController);
    repo = module.get<Repository<TaskStatus>>(repoToken);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be created', async () => {
    const response = await supertest(url).post('/task-status').send({
      title: 'Em progresso',
      color: '#ab9e79',
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      title: 'Em progresso',
      color: '#ab9e79',
    });
  });

  it('should return an error if color is not hex', async () => {
    const response = await supertest(url).post('/task-status').send({
      title: 'Em progresso',
      color: 'blue',
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: ['color must be a hexadecimal color'],
      error: 'Bad Request',
      statusCode: 400,
    });
  });
});
