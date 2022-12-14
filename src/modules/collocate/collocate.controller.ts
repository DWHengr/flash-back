import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { CollocateService } from './collocate.service';

@ApiTags('用户配置接口')
@Controller('collocate')
export class CollocateController {
  constructor(private readonly collocateService: CollocateService) {}
}
