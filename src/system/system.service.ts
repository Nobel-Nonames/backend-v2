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
    const [data] = await this.systemRepository.find({
      order: {
        createdAt: 'desc'
      }
    })

    return data
  }

  async getLastEventNumber() {
    const data = await this.findOneByLastData()

    return data.event_number
  }

  async systemSave(data: SystemEntity) {
    await this.systemRepository.save(data);
    return
  }
}
