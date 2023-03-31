import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: string;

  @Column({ comment: '用户名' })
  username: string;

  @Column({ comment: '密码' })
  password: string;

  @Column({ comment: '手机号', default: '' })
  phone: string;

  @Column({ comment: '邮箱', default: '' })
  email: string;

  @Column({ comment: '头像', type: 'text' })
  avatar: string;

  @CreateDateColumn({
    name: 'create_time',
    type: 'datetime',
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    name: 'update_time',
    type: 'datetime',
    comment: '修改时间',
  })
  updateTime: Date;
}
