import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProjectsEntity from 'src/entitiy/project/info.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private projectRepository: Repository<ProjectsEntity>
  ) { }

  async projectSave(data: ProjectsEntity) {
    return await this.projectRepository.save(data)
  }

  async findOneByUuid(uuid: string) {
    return await this.projectRepository.findOne({
      where: {
        uuid
      }
    })
  }
}
