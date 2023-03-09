import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserVo } from './vo/create.user.vo';
import { ResUtil } from '../../utils/res.util';
import { LoginUserVo } from './vo/login.user.vo';
import { JwtUtil } from '../../utils/jwt.util';
import { UserEntity } from './user.entity';
import { FlashException } from '../../exception/flash.exception';

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
    return ResUtil.success({ token, username: user.username });
  }

  @ApiOperation({ summary: '获取用户信息' })
  @Get('info')
  async info(@Req() request) {
    const userId = request.user.id;
    const data = await this.userService.info(userId);
    return ResUtil.success(data);
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
