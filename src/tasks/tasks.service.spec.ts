import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskStatusService } from '../task-status/task-status.service';
import { TaskStatus } from '../entities/task-status.entity';

describe('TasksService', () => {
  let service: TasksService;
  let statusService: TaskStatusService;
  let repo: Repository<Task>;
  let statusRepo: Repository<TaskStatus>;

  const repoToken = getRepositoryToken(Task);
  const statusRepoToken = getRepositoryToken(TaskStatus);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        TaskStatusService,
        {
          provide: repoToken,
          useClass: Repository,
        },
        {
          provide: statusRepoToken,
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    statusService = module.get<TaskStatusService>(TaskStatusService);
    repo = module.get<Repository<Task>>(repoToken);
    statusRepo = module.get<Repository<TaskStatus>>(statusRepoToken);
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

    jest.spyOn(statusService, 'findOne').mockResolvedValueOnce(undefined);

    const result = await service.create(newTask);

    expect(result).toMatchObject({
      message: 'Status not found',
    });
  });
});
