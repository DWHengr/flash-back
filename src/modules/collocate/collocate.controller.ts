import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CollocateService } from './collocate.service';
import { ResUtil } from '../../utils/res.util';
import { CreateCollocateVo } from './vo/create.collocate.vo';
import { CollocateEntity } from './collocate.entity';

@ApiTags('用户配置接口')
@Controller('collocate')
export class CollocateController {
  constructor(private readonly collocateService: CollocateService) {}

  @ApiOperation({ summary: '用户配置创建' })
  @Post('create')
  async create(@Body() collocateVo: CreateCollocateVo, @Req() request) {
    const collocateEntity = new CollocateEntity();
    collocateEntity.collocateContents = collocateVo.collocateContents;
    collocateEntity.userId = request.user.id;
    collocateEntity.collocateName =
      '双击修改名称-' + new Date().toLocaleString();
    const data = await this.collocateService.crete(collocateEntity);
    return ResUtil.success(data);
  }

  @ApiOperation({ summary: '用户配置删除' })
  @ApiBody({ type: Number, description: '用户配置ids', isArray: true })
  @Post('delete')
  async delete(@Body() ids: number[]) {
    const data = await this.collocateService.delete(ids);
    return ResUtil.success(data);
  }

  @ApiOperation({ summary: '用户配置更新' })
  @Post('update')
  async update(@Body() collocateVo: CreateCollocateVo) {
    const data = await this.collocateService.update({
      id: collocateVo.userId,
      collocateContents: collocateVo.collocateContents,
    });
    return ResUtil.success(data);
  }
}
