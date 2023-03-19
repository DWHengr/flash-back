import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DeleteResult, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { FlashException } from '../../exception/flash.exception';
import { PwdUserVo } from './vo/pwd.user.vo';
import { AvatarUserVo } from './vo/avatar.user.vo';

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
    return user;
  }

  async update(user: any): Promise<UserEntity[]> {
    return await this.userRepository.save(user);
  }

  async info(userId: any) {
    const user: UserEntity = await this.userRepository.findOne({
      where: { id: userId },
    });
    return user;
  }

  async changePwd(userId: any, pwdVo: PwdUserVo) {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new FlashException('用户不存在');
    }
    if (user.password != pwdVo.oldPassword) {
      throw new FlashException('原始密码错误');
    }
    user.password = pwdVo.newPassword;
    return await this.userRepository.save(user);
  }

  async changeAvatar(userId: any, avatarVo: AvatarUserVo) {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new FlashException('用户不存在');
    }
    user.avatar = avatarVo.avatar;
    return await this.userRepository.save(user);
  }
}
