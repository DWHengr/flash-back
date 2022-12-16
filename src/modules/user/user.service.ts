import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DeleteResult, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { FlashException } from '../../exception/flash.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private connection: Connection,
  ) {}

  async crete(user: any): Promise<UserEntity[]> {
    return await this.userRepository.save(user);
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new FlashException('用户不存在');
    }
    return user;
  }

  async delete(ids: number[]): Promise<DeleteResult> {
    return await this.userRepository.delete(ids);
  }

  async findByName(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new FlashException('用户不存在');
    }
    return user;
  }

  async update(user: any): Promise<UserEntity[]> {
    return await this.userRepository.save(user);
  }
}
