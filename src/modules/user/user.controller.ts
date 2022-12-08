import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserVo } from './vo/CreateUser.vo';

@ApiTags('用户接口')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '用户创建' })
  @Post('create')
  create(@Body() userVo: CreateUserVo) {
    return this.userService.crete(userVo);
  }
}
