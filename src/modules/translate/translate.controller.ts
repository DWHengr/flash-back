import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TranslateService } from './translate.service';
import { XfyunVo } from './vo/xfyun.vo';

@ApiTags('翻译')
@Controller('translate')
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}

  @ApiOperation({ summary: '讯飞' })
  @Post('xfyun')
  xfyun(@Body() xfyunVo: XfyunVo) {
    return this.translateService.xfyun(xfyunVo.text, xfyunVo.from, xfyunVo.to);
  }
}
