import { Body, Controller, Get, Post } from '@nestjs/common';
import { TestsService } from './test.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SaveUserVo } from './vo/saveUser.vo';

@ApiTags('测试接口')
@Controller('test')
export class TestController {
  constructor(private readonly testsService: TestsService) {}

  @ApiOperation({ summary: '查询全部' })
  @Get('list')
  list() {
    return this.testsService.list();
  }

  @ApiOperation({ summary: '创建/修改' })
  @Post('save')
  save(@Body() test: SaveUserVo) {
    return this.testsService.save(test);
  }
}
