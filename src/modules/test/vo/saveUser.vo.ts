import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsString, IsDate } from 'class-validator';

export class SaveUserVo {
  @ApiProperty({ description: 'id' })
  @IsInt({ message: 'id应为数字' })
  @IsNotEmpty({ message: 'id不为空' })
  readonly id: number;

  @ApiProperty({ description: '字符串测试数据' })
  @ApiProperty()
  @IsString({ message: 'stringTestData应为字符串' })
  readonly stringTestData: string;

  @ApiProperty({ description: '时间测试数据' })
  @ApiProperty()
  @IsDate({ message: 'dateTestData应为时间' })
  readonly dateTestData: Date;

  @ApiProperty({ description: 'int测试数据' })
  @ApiProperty()
  @IsDate({ message: 'intTestData应为数字' })
  readonly intTestData: number;
}
