import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestEntity } from './test.entity';
import { Connection, getRepository, Repository } from 'typeorm';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(TestEntity)
    private readonly testRepository: Repository<TestEntity>,
    private connection: Connection,
  ) {}

  async pageQuery(parameter: any): Promise<any> {
    const result = {
      pageNo: Number(parameter.pageNo),
      pageSize: Number(parameter.pageSize),
      totalPage: 0,
      totalRows: 0,
      rows: [],
    };
    const SQLwhere: any = {};
    result.rows = await this.testRepository.find({
      where: SQLwhere,
      order: {
        id: 'DESC',
      },
      skip: (parameter.pageNo - 1) * Number(parameter.pageSize),
      take: parameter.pageSize,
      cache: true,
    });
    result.totalRows = await this.testRepository.count();
    result.totalPage = Math.ceil(
      (await this.testRepository.count()) / parameter.pageSize,
    );
    return result;
  }

  async save(test: any): Promise<TestEntity[]> {
    return await this.testRepository.save(test);
  }

  async list(): Promise<TestEntity[]> {
    return await this.testRepository.find();
  }

  async delete(ids): Promise<boolean> {
    const deleteResult = await this.testRepository.delete(ids);
    if (deleteResult.affected == 0) {
      return false;
    } else {
      return true;
    }
  }
}
