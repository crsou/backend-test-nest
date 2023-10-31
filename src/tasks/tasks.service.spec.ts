import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Task } from '../entities/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskStatusService } from '../task-status/task-status.service';
import { TaskStatus } from '../entities/task-status.entity';
import { MockRepository } from '../utils/mockRepository';
import { BadRequestException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;
  let repo: MockRepository<Task>;
  let mockStatusService: {
    findOne: jest.Mock;
  };
  let statusRepo: MockRepository<TaskStatus>;

  beforeEach(async () => {
    repo = new MockRepository<Task>();
    statusRepo = new MockRepository<TaskStatus>();
    mockStatusService = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: repo,
        },
        {
          provide: getRepositoryToken(TaskStatus),
          useValue: statusRepo,
        },
        {
          provide: TaskStatusService,
          useValue: mockStatusService,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not be created if status id is invalid', async () => {
    const newTask = {
      title: 'Test task',
      description: 'Test description',
      status: 30,
    };

    // const mockError = new BadRequestException('Status not found')

    mockStatusService.findOne.mockReturnValue({ id: 1, title: 'em progresso' });
    // jest.spyOn(mockStatusService, 'findOne').mockRejectedValue(null);

    const result = await service.create(newTask);

    expect(result).toBeInstanceOf(BadRequestException);
  });
});
