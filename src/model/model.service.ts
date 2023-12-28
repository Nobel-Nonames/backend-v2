import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UsersEntity from 'src/entitiy/auth/user.entity';
import DeepLearnsEntity from 'src/entitiy/images/deeplearn.entity';
import ImagesEntity from 'src/entitiy/images/image.entity';
import ProjectsEntity from 'src/entitiy/project/info.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private projectRepository: Repository<ProjectsEntity>,
    @InjectRepository(ImagesEntity)
    private imageRepository: Repository<ImagesEntity>,
    @InjectRepository(DeepLearnsEntity)
    private deepLearnRepository: Repository<DeepLearnsEntity>
  ) { };

  async findOneByProjectId(uuid: string) {
    return await this.projectRepository.findOne({
      where: { uuid }
    });
  }

  async createProject(projectName: string, address: string, user: UsersEntity) {
    return await this.projectRepository.save({
      projectName,
      address,
      author: user,
      status: "Ready",
      history: [],
      etc: undefined,
      evtCount: 0
    })
  }

  async findByImageAll() {
    return await this.imageRepository.find();
  }

  async findByDeepLearnAll() {
    return await this.deepLearnRepository.find();
  }

  async imageCreate(image: ImagesEntity) {
    await this.imageRepository.save(image)
  }

  async deepLearnCreate(deepLearn: DeepLearnsEntity) {
    await this.deepLearnRepository.save(deepLearn);
  }
}
