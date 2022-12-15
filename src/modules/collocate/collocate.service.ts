import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DeleteResult, Repository } from "typeorm";
import { CollocateEntity } from './collocate.entity';

@Injectable()
export class CollocateService {
  constructor(
    @InjectRepository(CollocateEntity)
    private readonly collocateEntityRepository: Repository<CollocateEntity>,
    private connection: Connection,
  ) {}

  async crete(collocate: any): Promise<CollocateEntity[]> {
    return await this.collocateEntityRepository.save(collocate);
  }

  async delete(ids: number[]): Promise<DeleteResult> {
    return await this.collocateEntityRepository.delete(ids);
  }
}
