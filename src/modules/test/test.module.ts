import { TypeOrmModule } from '@nestjs/typeorm';
import { TestController } from './test.controller';
import { TestsService } from './test.service';
import { TestEntity } from './test.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([TestEntity])],
  controllers: [TestController],
  providers: [TestsService],
})
export class TestModule {}
