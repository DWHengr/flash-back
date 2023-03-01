import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DeleteResult, Repository } from 'typeorm';
import { CollocateEntity } from './collocate.entity';
import { FlashException } from '../../exception/flash.exception';

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

  async update(collocate: {
    id: number;
    collocateName: string;
  }): Promise<CollocateEntity> {
    if (!collocate.id) {
      throw new FlashException('Id不能为空');
    }
    const toUpdate = await this.collocateEntityRepository.findOne(collocate.id);
    if (!toUpdate) {
      throw new FlashException('配置不存在');
    }
    toUpdate.collocateName = collocate.collocateName;
    return await this.collocateEntityRepository.save(toUpdate);
  }

  async list(userId: string) {
    if (!userId) {
      throw new FlashException('Id不能为空');
    }
    const Collocates: CollocateEntity[] =
      await this.collocateEntityRepository.find({
        select: ['id', 'collocateName', 'createTime'],
        where: { userId: userId },
        order: { createTime: 'DESC' },
      });
    return Collocates;
  }
}
