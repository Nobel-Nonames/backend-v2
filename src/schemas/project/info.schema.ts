import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, HydratedDocument } from "mongoose";
import { IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import Users from "../auth/user.schema";

export type RawDocument = HydratedDocument<Projects>;

@Schema()
export default class Projects {
  @Prop({
    name: 'ProjectName',
    required: true,
    type: mongoose.Schema.Types.String,
  })
  projectName: string;

  @Prop({
    name: 'Status',
    type: mongoose.Schema.Types.String,
    enum: ["Ready", "Uploading", "Upload End", "Analyzing", "finish"],
    required: true,
    default: "Ready"
  })
  status: string;

  @Prop({
    name: 'UserInfo_id',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  })
  UserInfo_id: Users

  @Prop({
    name: 'History',
    type: mongoose.Schema.Types.Array
  })
  history: any[];

  @Prop({
    name: 'Address',
    type: mongoose.Schema.Types.String,
    required: true
  })
  address: string;

  @Prop({
    name: 'ThumnailPath',
    required: false
  })
  thumnailPath: string

  @IsDate()
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    example: "2023-11-29 20:14:29.234751",
    description: "데이터 기입 시간"
  })
  @Prop({
    name: 'createdAt',
    type: mongoose.Schema.Types.Date,
    required: true,
    default: new Date()
  })
  createdAt: Date;

  @IsNotEmpty()
  @Prop({
    name: 'ETC',
    type: mongoose.Schema.Types.Mixed
  })
  etc: any;

  @IsString()
  @IsNotEmpty()
  @Prop({
    name: 'EvtCount',
    type: mongoose.Schema.Types.Number,
    default: 0
  })
  evtCount: string;
}

export const ProjectInfoSchema = SchemaFactory.createForClass(Projects);
