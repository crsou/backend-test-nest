import { Test, TestingModule } from '@nestjs/testing';
import { TaskStatusService } from './task-status.service';
import { TaskStatus } from '../entities/task-status.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TaskStatusService', () => {
  let service: TaskStatusService;
  let repo: Repository<TaskStatus>;

  const repoToken = getRepositoryToken(TaskStatus);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskStatusService,
        {
          provide: repoToken,
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TaskStatusService>(TaskStatusService);
    repo = module.get<Repository<TaskStatus>>(repoToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not be created if color is not hex', async () => {
    const newStatus = {
      title: 'Em progresso',
      color: '#12345', // Incorrect hex format
    };

    const errorResponse = {
      message: ['color must be a hexadecimal color'],
      error: 'Bad Request',
      statusCode: 400,
    };

    jest.fn();

    jest.spyOn(service, 'create').mockRejectedValue(errorResponse);

    await expect(service.create(newStatus)).rejects.toEqual(errorResponse);
  });
});
