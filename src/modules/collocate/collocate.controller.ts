import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CollocateService } from './collocate.service';
import { ResUtil } from '../../utils/res.util';
import { CreateCollocateVo } from './vo/create.collocate.vo';
import { CollocateEntity } from './collocate.entity';
import { updateCollocateVo } from './vo/update.collocate.vo';

@ApiTags('用户配置接口')
@Controller('collocate')
export class CollocateController {
  constructor(private readonly collocateService: CollocateService) {}

  @ApiOperation({ summary: '用户配置创建' })
  @Post('create')
  async create(@Body() collocateVo: CreateCollocateVo, @Req() request) {
    const collocateEntity = new CollocateEntity();
    const now = new Date();
    collocateEntity.collocateContents = collocateVo.collocateContents;
    collocateEntity.userId = request.user.id;
    collocateEntity.collocateName = '双击修改名称-' + now.toLocaleString();
    collocateEntity.createTime = now;
    collocateEntity.updateTime = now;
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

  @ApiOperation({ summary: '用户配置修改' })
  @Post('update')
  async update(@Body() collocateVo: updateCollocateVo) {
    const data = await this.collocateService.update({
      id: collocateVo.id,
      collocateName: collocateVo.collocateName,
    });
    if (data) {
      return ResUtil.success(null);
    }
    return ResUtil.fail();
  }

  @ApiOperation({ summary: '用户配置列表' })
  @Get('list')
  async list(@Req() request) {
    const userId = request.user.id;
    const data = await this.collocateService.list(userId);
    return ResUtil.success(data);
  }

  @ApiOperation({ summary: '根据id查询用户配置信息' })
  @Get('info/:id')
  async info(@Param('id') id: string, @Req() request) {
    const userId = request.user.id;
    const data = await this.collocateService.info(id, userId);
    return ResUtil.success(data);
  }
}
