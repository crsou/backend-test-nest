import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Task } from './task.entity';

// Tabela referente as colunas ou "passo" de cada task no quadro Kanban
@Entity('task-status')
export class TaskStatus extends BaseEntity {
  @Column()
  title: string;

  // Útil para o frontend, como é comum cada coluna ter uma cor.
  @Column()
  color: string;

  @OneToMany(() => Task, (task) => task.status)
  tasks: Task[];
}
