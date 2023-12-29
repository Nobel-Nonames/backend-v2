import mongoose, { Document, HydratedDocument } from "mongoose";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import ProjectsEntity from "../project/info.entity";

@Entity({ name: 'images_entity' })
export default class ImagesEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @Column({
    name: 'serial_filename',
    type: 'text',
    nullable: false
  })
  serialFileName: string;

  @Column({
    name: 'FileName',
    type: 'text',
    nullable: false
  })
  fileName: string;

  @Column({
    name: 'FilePath',
    type: 'text',
    nullable: false
  })
  filePath: string;

  @Column({
    name: 'ThumnailPath',
    type: 'text',
    nullable: false
  })
  thumnailPath: string;

  @Column({
    name: 'SerialNumber',
    type: 'text',
    nullable: false
  })
  serialNumber: string;

  @Column({
    name: 'DateTimeOriginal',
    nullable: false,
    type: 'timestamp'
  })
  dateTimeOriginal: Date;

  @Column({
    name: 'x1',
    type: 'double',
    nullable: true,
    default: -1
  })
  x1: number;

  @Column({
    name: 'y1',
    type: 'double',
    nullable: true,
    default: -1
  })
  y1: number;

  @Column({
    name: 'x2',
    type: 'double',
    nullable: true,
    default: -1
  })
  x2: number;

  @Column({
    name: 'y2',
    type: 'double',
    nullable: true,
    default: -1
  })
  y2: number;

  @Column({
    name: 'ExifData',
    type: 'json',
    nullable: false
  })
  exifData: any;

  @ManyToOne(() => ProjectsEntity, { nullable: false })
  @JoinColumn({ name: 'project', referencedColumnName: 'uuid' })
  project: ProjectsEntity;

  @Column({
    name: 'BestClass',
    type: 'text',
    nullable: true
  })
  bestClass?: string;

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

  @Column({
    name: 'update_classname',
    type: 'double',
    nullable: true,
    default: -1
  })
  updateClass: number;

  @Column({
    name: 'update_count',
    type: 'int',
    nullable: true,
    default: -1
  })
  updateCount: number;

  // @Prop({
  //   name: 'highlighted',
  //   type: mongoose.Schema.Types.Boolean,
  //   default: false
  // })
  // highlighted: Boolean;

  @Column({
    name: 'modifyFlag',
    type: 'boolean',
    default: false
  })
  modifyFlag: Boolean;

  @Column({
    name: 'searchFlag',
    type: 'boolean',
    default: false
  })
  searchFlag: Boolean;

  @Column({
    name: 'updateFlag',
    type: 'boolean',
    default: false
  })
  updateFlag: Boolean;

  @Column({
    name: 'bestprob',
    type: 'int',
    default: -1
  })
  bestprob: number;

  @Column({
    name: 'ClassName',
    type: 'text',
    nullable: true
  })
  className: string;

  @Column({
    name: 'Count',
    type: 'int',
    nullable: true,
    default: -1
  })
  count: number;
}
