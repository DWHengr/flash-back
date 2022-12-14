import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { CollocateService } from './collocate.service';
import { ResUtil } from '../../utils/res.util';
import { CreateCollocateVo } from './vo/create.collocate.vo';

@ApiTags('用户配置接口')
@Controller('collocate')
export class CollocateController {
  constructor(private readonly collocateService: CollocateService) {}

  @ApiOperation({ summary: '用户配置创建' })
  @Post('create')
  async create(@Body() collocateVo: CreateCollocateVo) {
    const data = await this.collocateService.crete(collocateVo);
    return ResUtil.success(data);
  }
}
