import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCollocateVo {
  @ApiProperty({ description: '用户id' })
  @IsString({ message: '用户id不能为空' })
  userId: string;

  @ApiProperty({ description: '用户配置内容' })
  @IsString({ message: '配置内容不能为空' })
  collocateContents: string;
}
