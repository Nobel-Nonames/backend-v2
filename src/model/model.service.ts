import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ImagesEntity from 'src/entitiy/images/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(ImagesEntity)
    private imageRepository: Repository<ImagesEntity>
  ) { };

  async findByImageAll() {
    return await this.imageRepository.find();
  }

  async findOneByPath(path: string) {
    return await this.imageRepository.findOne({
      where: {
        filePath: path
      }
    })
  }

  async imageCreate(image: ImagesEntity) {
    await this.imageRepository.save(image)
  }
}
