import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollocateEntity } from './collocate.entity';
import { CollocateController } from './collocate.controller';
import { CollocateService } from './collocate.service';

@Module({
  imports: [TypeOrmModule.forFeature([CollocateEntity])],
  controllers: [CollocateController],
  providers: [CollocateService],
})
export class CollocateModule {}
