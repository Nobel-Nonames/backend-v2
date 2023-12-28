import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import SystemEntity from 'src/entitiy/system.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(SystemEntity)
    private systemRepository: Repository<SystemEntity>,
  ) { }

  async findOneByLastData() {
    return await this.systemRepository.find({
      order: {
        createdAt: 'desc'
      }
    })[0]
  }

  async systemSave(data: SystemEntity) {
    await this.systemRepository.save(data);
    return
  }
}
