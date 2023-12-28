import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'deeplearns_entity' })
export default class DeepLearnsEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @ApiProperty({
    example: '2023-11-29 20:14:29.234751',
    description: '파일 저장시간'
  })
  @Column({
    name: 'DateTimeOriginal',
    type: 'timestamp',
    nullable: false
  })
  DateTimeOriginal: Date;

  @Column({
    name: 'BestClass',
    type: 'text'
  })
  bestClass: string;

  @Column({
    name: 'Count',
    type: 'int',
    nullable: false,
    default: 0
  })
  count: number;

  @Column({
    name: 'Infos',
    type: 'array',
    nullable: true
  })
  infos: any[];

  @Column({
    name: 'size',
    type: 'array',
    nullable: true
  })
  size: any[];

  @Column({
    name: 'ImageDatas',
    type: 'json',
    nullable: true
  })
  ImageDatas: any;

  @Column({
    name: 'evtnum',
    type: 'int',
    nullable: false,
    default: 0
  })
  evtNum: number;

  @Column({
    name: 'evtDate',
    type: 'timestamp',
    nullable: false
  })
  evtDate: Date;

  // @Prop({
  //   name: 'update_classname',
  //   type: mongoose.Schema.Types.String,
  //   default: null
  // })
  // updateClassname: string;

  // @Prop({
  //   name: 'update_count',
  //   type: mongoose.Schema.Types.Number,
  //   default: -1
  // })
  // updateCount: number;

  // @Prop({
  //   name: 'ImageDataId',
  //   type: mongoose.Schema.Types.ObjectId
  // })
  // imageDataId: string;

  // @Prop({
  //   name: 'highlighted',
  //   type: mongoose.Schema.Types.Boolean,
  //   default: false
  // })
  // highlighted: Boolean;

  // @Prop({
  //   name: 'modifyFlag',
  //   type: mongoose.Schema.Types.Boolean,
  //   default: false
  // })
  // modifyFlag: Boolean;

  // @Prop({
  //   name: 'searchFlag',
  //   type: mongoose.Schema.Types.Boolean,
  //   default: false
  // })
  // searchFlag: Boolean;

  // @Prop({
  //   name: 'updateFlag',
  //   type: mongoose.Schema.Types.Boolean,
  //   default: false
  // })
  // updateFlag: Boolean;

  // @Prop({
  //   name: 'bestprob',
  //   type: mongoose.Schema.Types.Number,
  //   default: 0
  // })
  // bestprob: Boolean;
}
