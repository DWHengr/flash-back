import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CodeForgetPwdVo {
  @ApiProperty({ description: '用户名' })
  @IsString({ message: '用户名不能为空' })
  readonly username: string;
}
