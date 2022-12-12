import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserVo {
  @ApiProperty({ description: '用户名' })
  @IsString({ message: '用户名不能为空' })
  readonly username: string;

  @ApiProperty({ description: '密码' })
  @IsString({ message: '密码不能为空' })
  readonly password: string;
}
