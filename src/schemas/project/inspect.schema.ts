import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import mongoose, { Document, HydratedDocument } from "mongoose";

export type RawDocument = HydratedDocument<Inspect>;

@Schema()
export default class Inspect {
  @Prop({
    name: 'ProjectInfo_id',
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'projects'
  })
  project_id: string;

  @Prop({
    name: 'DateTimeOriginal',
    type: mongoose.Schema.Types.Date,
  })
  dateTimeOriginal: Date;

  @Prop({
    name: 'ClassName',
    type: mongoose.Schema.Types.String,
  })
  className: string;

  @Prop({
    name: 'Count',
    type: mongoose.Schema.Types.Number,
  })
  count: string;

  @Prop({
    name: 'DeepLearningInfo_id',
    type: mongoose.Schema.Types.ObjectId,
    ref: 'deepLearns'
  })
  deepLearn_id: string;

  @Prop({
    name: 'SerialNumber',
    type: mongoose.Schema.Types.String
  })
  serialNumber: string;
}

export const InspectSchema = SchemaFactory.createForClass(Inspect);
