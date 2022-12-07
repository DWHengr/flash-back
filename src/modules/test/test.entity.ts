import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('test')
export class TestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  dateTestData: Date;

  @Column()
  stringTestData: string;

  @Column()
  intTestData: number;
}
