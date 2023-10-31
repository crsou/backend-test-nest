import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Sempre gosto de criar uma entidade base que possui campos que devem existir em todas as outras.
// No caso, além do id, é útil ter uma data de criação e data do último update para cada item na tabela.

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt?: string;

  @UpdateDateColumn()
  updatedAt?: string;
}
