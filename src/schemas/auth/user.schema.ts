import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsEnum, IsNotEmpty, IsString } from "class-validator";
import mongoose, { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<Users>;

@Schema()
export default class Users {
  @IsString()
  @IsEnum(['admin', 'master', 'user'])
  @IsNotEmpty()
  @ApiProperty({
    example: "user",
    description: "유저 권한"
  })
  @Prop({
    name: 'type',
    required: true,
    type: mongoose.Schema.Types.String,
    enum: ['admin', 'master', 'user'],
    default: 'user'
  })
  Type: 'admin' | 'master' | 'user';

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'username',
    description: '유저 네임, 아이디로 사용'
  })
  @Prop({
    name: 'username',
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'password',
    description: '비밀번호, 암호화 되있음'
  })
  @Prop({
    name: 'password',
    type: mongoose.Schema.Types.String,
    required: true
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '성함',
    description: '가입자 성함'
  })
  @Prop({
    name: 'name',
    type: mongoose.Schema.Types.String,
    required: true
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Prop({
    name: 'salt',
    type: mongoose.Schema.Types.String,
    required: true
  })
  salt: string;

  @IsNotEmpty()
  @Prop({
    name: 'ETC',
    type: mongoose.Schema.Types.Mixed
  })
  etc: any;

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

export const UserSchema = SchemaFactory.createForClass(Users);