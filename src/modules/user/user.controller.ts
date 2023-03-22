import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserVo } from './vo/create.user.vo';
import { ResUtil } from '../../utils/res.util';
import { LoginUserVo } from './vo/login.user.vo';
import { JwtUtil } from '../../utils/jwt.util';
import { UserEntity } from './user.entity';
import { FlashException } from '../../exception/flash.exception';
import { PwdUserVo } from './vo/pwd.user.vo';
import { AvatarUserVo } from './vo/avatar.user.vo';
import { CodeUserVo } from './vo/code.user.vo';

@ApiTags('用户接口')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '用户创建' })
  @Post('register')
  async create(@Body() userVo: CreateUserVo) {
    const user: UserEntity = await this.userService.findByName(userVo.username);
    if (user) {
      throw new FlashException('用户已存在');
    }
    const data = await this.userService.crete(userVo);
    return ResUtil.success(data);
  }

  @ApiOperation({ summary: '用户登录' })
  @Post('login')
  async login(@Body() userVo: LoginUserVo) {
    const user: UserEntity = await this.userService.findByName(userVo.username);
    if (!user) {
      throw new FlashException('用户不存在');
    }
    if (userVo.password != user.password) {
      throw new FlashException('密码错误');
    }
    const token = JwtUtil.createToken(user);
    return ResUtil.success({
      token,
      username: user.username,
      avatar: user.avatar,
    });
  }

  @ApiOperation({ summary: '获取用户信息' })
  @Get('info')
  async info(@Req() request) {
    const userId = request.user.id;
    const data = await this.userService.info(userId);
    return ResUtil.success(data);
  }

  @ApiOperation({ summary: '修改密码' })
  @Post('pwd')
  async changePwd(@Body() pwdVo: PwdUserVo, @Req() request) {
    const userId = request.user.id;
    const data = await this.userService.changePwd(userId, pwdVo);
    if (data) return ResUtil.success('修改成功');
    return ResUtil.failMsg('修改失败');
  }

  @ApiOperation({ summary: '修改头像' })
  @Post('avatar')
  async changeAvatar(@Body() avatarVo: AvatarUserVo, @Req() request) {
    const userId = request.user.id;
    const data = await this.userService.changeAvatar(userId, avatarVo);
    if (data) return ResUtil.success('修改成功');
    return ResUtil.failMsg('修改失败');
  }

  @ApiOperation({ summary: '发送验证码' })
  @Post('code')
  async verify(@Body() codeVo: CodeUserVo, @Req() request) {
    const userId = request.user.id;
    await this.userService.sendVerifyCode(userId, codeVo.email);
    return ResUtil.success(null);
  }

  // @ApiOperation({ summary: '用户删除' })
  // @ApiBody({ type: Number, description: '用户ids', isArray: true })
  // @Post('delete')
  // async delete(@Body() ids: number[]) {
  //   const data = await this.userService.delete(ids);
  //   return ResUtil.success(data);
  // }

  // @ApiOperation({ summary: '用户更新' })
  // @Post('update')
  // async update(@Body() userVo: CreateUserVo) {
  //   const data = await this.userService.update(userVo);
  //   return ResUtil.success(data);
  // }
}
