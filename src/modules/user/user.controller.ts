import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserVo } from './vo/create.user.vo';
import { ResUtil } from '../../utils/res.util';
import { LoginUserVo } from './vo/login.user.vo';
import { JwtUtil } from '../../utils/jwt.util';

@ApiTags('用户接口')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '用户创建' })
  @Post('create')
  async create(@Body() userVo: CreateUserVo) {
    const data = await this.userService.crete(userVo);
    return ResUtil.success(data);
  }

  @ApiOperation({ summary: '用户登录' })
  @Post('login')
  async login(@Body() userVo: LoginUserVo) {
    const user = await this.userService.findByName(userVo.username);
    const token = JwtUtil.createToken(user);
    return ResUtil.success({ token });
  }
}
