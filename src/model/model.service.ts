import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ImagesEntity from 'src/entities/images/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(ImagesEntity)
    private imageRepository: Repository<ImagesEntity>
  ) { };

  async findOneByUuid(uuid: string) {
    return await this.imageRepository.findOne({
      where: {
        uuid
      }
    })
  }

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

  async imageSave(image: ImagesEntity) {
    await this.imageRepository.save(image)
  }

  async findByImageInAllPagination(page: number) {
    return await this.imageRepository.find({
      order: {
        dateTimeOriginal: 'DESC'
      },
      take: 15,
      skip: page * 15
    })
  }

  async findByImageInUserPagination(page: number) {
    return await this.imageRepository.find({
      where: {
        searchFlag: true
      },
      order: {
        dateTimeOriginal: "DESC",
      },
      take: 15,
      skip: page * 15
    })
  }
}
