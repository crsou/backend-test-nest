import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TaskStatus } from './task-status.entity';

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
