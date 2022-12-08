import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserVo } from './vo/CreateUser.vo';
import { ResUtil } from '../../utils/res.util';

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
}
