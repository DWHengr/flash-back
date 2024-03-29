import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CodeEmailSettingUserVo {
  @ApiProperty({ description: '邮箱' })
  @IsString({ message: '邮箱不能为空' })
  readonly email: string;
}
