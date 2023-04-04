import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TranslateService } from './translate.service';
import { XfyunVo } from './vo/xfyun.vo';
import { VariableNameVo } from './vo/variable.name.vo';
import { ResUtil } from '../../utils/res.util';

@ApiTags('翻译')
@Controller('translate')
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}

  @ApiOperation({ summary: '讯飞' })
  @Post('xfyun')
  xfyun(@Body() xfyunVo: XfyunVo) {
    return this.translateService.xfyun(xfyunVo.text, xfyunVo.from, xfyunVo.to);
  }

  @ApiOperation({ summary: '变量命名' })
  @Post('var')
  async variableNames(@Body() variableNameVo: VariableNameVo) {
    const variables = await this.translateService.variableNames(
      variableNameVo.variableName,
    );
    return ResUtil.success(variables);
  }
}
