import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SetEmailUserVo {
  @ApiProperty({ description: '邮箱' })
  @IsString({ message: '邮箱不能为空' })
  readonly email: string;

  @ApiProperty({ description: '验证码' })
  @IsString({ message: '验证码' })
  readonly code: string;
}
