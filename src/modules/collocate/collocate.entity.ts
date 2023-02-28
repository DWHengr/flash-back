import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('collocate')
export class CollocateEntity {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number;

  @Column({ name: 'user_id', comment: '用户id' })
  userId: string;

  @Column({ name: 'collocate_name', type: 'varchar', comment: '名称' })
  collocateName: string;

  @Column({ name: 'collocate_contents', type: 'text', comment: '用户id' })
  collocateContents: string;

  @Column({
    name: 'create_time',
    type: 'datetime',
    comment: '创建时间',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'datetime',
    comment: '修改时间',
  })
  updateTime: Date;
}
