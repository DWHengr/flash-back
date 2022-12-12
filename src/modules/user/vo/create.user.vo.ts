import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserVo {
  @ApiProperty({ description: '用户名' })
  @IsString({ message: '用户名不能为空' })
  readonly username: string;

  @ApiProperty({ description: '密码' })
  @IsString({ message: '密码不能为空' })
  readonly password: string;

  @ApiProperty({ description: '手机号' })
  readonly phone: string;

  @ApiProperty({ description: '邮箱' })
  readonly email: string;
}
