import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DeleteResult, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { FlashException } from '../../exception/flash.exception';
import { PwdUserVo } from './vo/pwd.user.vo';
import { AvatarUserVo } from './vo/avatar.user.vo';
import { FlashUtil } from '../../utils/flash.util';
import { EmailService } from '../email/email.service';
import { VerifyVo } from './vo/verify.vo';
import { SetEmailUserVo } from './vo/set.email.user.vo';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class UserService {
  userVerifyCode: Map<string, VerifyVo> = new Map();

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly emailService: EmailService,
    private readonly loggerService: LoggerService,
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

  async sendEmailSettingVerifyCode(userId: any, email: any) {
    const userVerify = this.userVerifyCode.get(userId);
    if (userVerify) {
      if (FlashUtil.getSecondsDiff(userVerify.time, new Date()) < 60) {
        throw new FlashException('验证码发送频率过快').add('userid', userId);
      }
    }
    const code = FlashUtil.genVerifyCode();
    const verifyVo = new VerifyVo();
    verifyVo.code = code;
    verifyVo.time = new Date();
    verifyVo.ext = email;
    this.userVerifyCode.set(userId, verifyVo);
    this.emailService.sendVerifyCodeEmail(email, code).catch(() => {
      this.loggerService.error('验证码发送失败,userid:' + userId);
    });
  }

  async setEmail(userId: any, setEmailUserVo: SetEmailUserVo) {
    const userVerify = this.userVerifyCode.get(userId);
    if (!userVerify) {
      throw new FlashException('验证码错误').add('userid', userId);
    }
    if (setEmailUserVo.code != userVerify.code) {
      throw new FlashException('验证码错误').add('userid', userId);
    }
    if (setEmailUserVo.email != userVerify.ext) {
      throw new FlashException('邮箱错误').add('userid', userId);
    }
    const user = await this.userRepository.findOne(userId);
    user.email = setEmailUserVo.email;
    this.userVerifyCode.delete(userId);
    return await this.userRepository.save(user);
  }
}
