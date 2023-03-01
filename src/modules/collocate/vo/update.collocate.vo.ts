import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class updateCollocateVo {
  @ApiProperty({ description: '配置id' })
  @IsString({ message: '配置id不能为空' })
  id: number;

  @ApiProperty({ description: '配置名称' })
  @IsString({ message: '配置名称不能为空' })
  collocateName: string;
}
