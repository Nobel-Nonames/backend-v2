import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProjectsEntity from 'src/entities/project/info.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private projectRepository: Repository<ProjectsEntity>,
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

  async findByPagination(page: number) {
    return await this.projectRepository.find({
      order: {
        createdAt: 'DESC'
      },
      take: 15,
      skip: page * 15
    })
  }
}
