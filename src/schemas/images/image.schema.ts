import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import mongoose, { Document, HydratedDocument } from "mongoose";

export type RawDocument = HydratedDocument<Image>;

@Schema()
export default class Image {
  @Prop({
    name: 'serial_filename',
    required: true,
    type: mongoose.Schema.Types.String,
    index: true
  })
  serialFileName: string;

  @Prop({
    name: 'FileName',
    type: mongoose.Schema.Types.String,
    required: true
  })
  fileName: string;

  @Prop({
    name: 'FilePath',
    type: mongoose.Schema.Types.String,
  })
  filePath: string;

  @Prop({
    name: 'ThumnailPath',
    type: mongoose.Schema.Types.String,
  })
  thumnailPath: string;

  @Prop({
    name: 'SerialNumber',
    type: mongoose.Schema.Types.String,
  })
  serialNumber: string;

  @Prop({
    name: 'DateTimeOriginal',
    type: mongoose.Schema.Types.Date,
  })
  dateTimeOriginal: Date;

  @Prop({
    name: 'ExifData',
    type: mongoose.Schema.Types.Mixed,
  })
  exifData: any;

  @Prop({
    name: 'ProjectInfo',
    type: mongoose.Schema.Types.ObjectId,
    ref: 'projects'
  })
  projectInfo: any;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
