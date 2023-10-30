import { BaseEntity } from 'src/utils/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('tasks')
export class Task extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  status: string;

  @Column({ type: 'date', nullable: true })
  endDate: Date;
}
