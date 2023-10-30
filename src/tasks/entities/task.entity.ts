import { TaskStatus } from 'src/task-status/entities/task-status.entity';
import { BaseEntity } from 'src/utils/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('tasks')
export class Task extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @ManyToOne(() => TaskStatus, (taskStatus) => taskStatus.tasks, {
    eager: true,
  })
  status: TaskStatus;
}
