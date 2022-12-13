import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiProperty, ApiQuery, ApiTags } from "@nestjs/swagger";
import { UserService } from './user.service';
import { CreateUserVo } from './vo/create.user.vo';
import { ResUtil } from '../../utils/res.util';
import { LoginUserVo } from './vo/login.user.vo';
import { JwtUtil } from '../../utils/jwt.util';
import { ApiImplicitBody } from "@nestjs/swagger/dist/decorators/api-implicit-body.decorator";

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

  @ApiOperation({ summary: '用户删除' })
  @ApiBody({ type: Number, description: '用户ids', isArray: true })
  @Post('delete')
  async delete(@Body() ids: number[]) {
    const data = await this.userService.delete(ids);
    return ResUtil.success(data);
  }
}
