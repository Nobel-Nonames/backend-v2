import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import DeepLearns from 'src/schemas/images/deeplearn.schema';
import Image from 'src/schemas/images/image.schema';
import Projects from 'src/schemas/project/info.schema';

@Injectable()
export class ModelService {
  constructor(
    @InjectModel(Projects.name)
    private projectModel: Model<Projects>,
    @InjectModel(Image.name)
    private imageModel: Model<Image>,
    @InjectModel(DeepLearns.name)
    private deepLearnModel: Model<DeepLearns>
  ) { };

  async findOneByProjectId(_id: string) {
    return await this.projectModel.findOne({ _id });
  }

  async createProject(projectName: string, address: string, user: Document) {
    return await this.projectModel.create({
      projectName,
      address,
      UserInfo_id: user._id,
      status: "Ready",
      history: [],
      etc: undefined,
      evtCount: 0
    })
  }

  async findByImageAll() {
    return await this.imageModel.find();
  }

  async findByDeepLearnAll() {
    return await this.deepLearnModel.find();
  }

  async imageCreate(image: Image) {
    await this.imageModel.create(image)
  }

  async deepLearnCreate(deepLearn: DeepLearns) {
    await this.deepLearnModel.create(deepLearn);
  }
}
