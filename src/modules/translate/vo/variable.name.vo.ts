import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class VariableNameVo {
  @ApiProperty({ description: '变量名' })
  @IsNotEmpty({ message: '变量名不能为空' })
  readonly variableName: string;
}
