import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
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
}
