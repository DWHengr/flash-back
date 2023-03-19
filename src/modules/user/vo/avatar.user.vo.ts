import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AvatarUserVo {
  @ApiProperty({ description: '头像' })
  @IsString({ message: '头像不能为空' })
  readonly avatar: string;
}
