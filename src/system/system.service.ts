import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import Systems from 'src/schemas/system.schema';

@Injectable()
export class SystemService {
  constructor(
    @InjectModel(Systems.name)
    private systemModel: Model<Systems>,
  ) { }

  async findOneByLastData() {
    return this.systemModel.findOne({
      lastData: {
        $exists: true,
      },
    }).sort({ lastData: -1 })
  }

  async systemDocSave(data: Document) {
    await data.save();
    return
  }

  async systemCreate(data: Systems) {
    await this.systemModel.create(data);
  }
}
