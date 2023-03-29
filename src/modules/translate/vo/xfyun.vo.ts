import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class XfyunVo {
  @ApiProperty({ description: '翻译内容' })
  @IsNotEmpty({ message: '翻译内容不能为空' })
  readonly text: string;

  @ApiProperty({ description: '源语种' })
  @IsNotEmpty({ message: '语种不能为空' })
  readonly from: string;

  @ApiProperty({ description: '目标语种' })
  @IsNotEmpty({ message: '语种不能为空' })
  readonly to: string;
}
