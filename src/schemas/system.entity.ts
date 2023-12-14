import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsEnum, IsNotEmpty, IsString } from "class-validator";
import mongoose, { HydratedDocument } from "mongoose";

export type SystemDocument = HydratedDocument<Systems>;

@Schema()
export default class Systems {
  @IsNotEmpty()
  @Prop({
    name: 'event_number',
    type: mongoose.Schema.Types.Number
  })
  event_number: number;

  @IsDate()
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    example: "2023-11-29 20:14:29.234751",
    description: "유저 가입 시간"
  })
  @Prop({
    name: 'createdAt',
    type: mongoose.Schema.Types.Date,
    required: true,
    default: new Date()
  })
  createdAt: Date;
}

export const SystemSchema = SchemaFactory.createForClass(Systems);