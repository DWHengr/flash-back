import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PwdUserVo {
  @ApiProperty({ description: '原密码' })
  @IsString({ message: '原密码不能为空' })
  readonly oldPassword: string;

  @ApiProperty({ description: '新密码' })
  @IsString({ message: '新密码不能为空' })
  readonly newPassword: string;
}
