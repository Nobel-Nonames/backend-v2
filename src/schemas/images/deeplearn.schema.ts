import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { HydratedDocument } from "mongoose";

export type RawDocument = HydratedDocument<DeepLearns>;

@Schema()
export default class DeepLearns {
  @ApiProperty({
    example: '2023-11-29 20:14:29.234751',
    description: '파일 저장시간'
  })
  @Prop({
    name: 'DateTimeOriginal',
    type: mongoose.Schema.Types.Date
  })
  DateTimeOriginal: Date;

  @Prop({
    name: 'BestClass',
    type: mongoose.Schema.Types.String
  })
  bestClass: string;

  @Prop({
    name: 'Count',
    type: mongoose.Schema.Types.Number
  })
  count: number;

  @Prop({
    name: 'Infos',
    type: mongoose.Schema.Types.Array
  })
  infos: any[];

  @Prop({
    name: 'size',
    type: mongoose.Schema.Types.Array
  })
  size: any[];

  @Prop({
    name: 'ImageDatas',
    type: mongoose.Schema.Types.Mixed
  })
  ImageDatas: any;

  @Prop({
    name: 'evtnum',
    type: mongoose.Schema.Types.Number
  })
  evtNum: number;

  @Prop({
    name: 'evtDate',
    type: mongoose.Schema.Types.Date
  })
  evtDate: Date;

  @Prop({
    name: 'update_classname',
    type: mongoose.Schema.Types.String,
    default: null
  })
  updateClassname: string;

  @Prop({
    name: 'update_count',
    type: mongoose.Schema.Types.Number,
    default: -1
  })
  updateCount: number;

  @Prop({
    name: 'ImageDataId',
    type: mongoose.Schema.Types.ObjectId
  })
  imageDataId: string;

  @Prop({
    name: 'highlighted',
    type: mongoose.Schema.Types.Boolean,
    default: false
  })
  highlighted: Boolean;

  @Prop({
    name: 'modifyFlag',
    type: mongoose.Schema.Types.Boolean,
    default: false
  })
  modifyFlag: Boolean;

  @Prop({
    name: 'searchFlag',
    type: mongoose.Schema.Types.Boolean,
    default: false
  })
  searchFlag: Boolean;

  @Prop({
    name: 'updateFlag',
    type: mongoose.Schema.Types.Boolean,
    default: false
  })
  updateFlag: Boolean;

  @Prop({
    name: 'bestprob',
    type: mongoose.Schema.Types.Number,
    default: 0
  })
  bestprob: Boolean;
}

export const DeepLearnSchema = SchemaFactory.createForClass(DeepLearns);



