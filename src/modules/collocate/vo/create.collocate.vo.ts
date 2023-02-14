import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCollocateVo {
  userId: string;

  @ApiProperty({ description: '用户配置内容' })
  @IsString({ message: '配置内容不能为空' })
  collocateContents: string;
}
