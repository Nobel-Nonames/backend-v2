import mongoose, { Document, HydratedDocument } from "mongoose";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import ProjectsEntity from "../project/info.entity";

@Entity({ name: 'images_entity' })
export default class ImagesEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @Column({
    name: 'serial_filename',
    nullable: false,
    type: 'text'
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
    nullable: false,
    type: 'text',
  })
  filePath: string;

  @Column({
    name: 'ThumnailPath',
    nullable: false,
    type: 'text',
  })
  thumnailPath: string;

  @Column({
    name: 'SerialNumber',
    nullable: false,
    type: 'text',
  })
  serialNumber: string;

  @Column({
    name: 'DateTimeOriginal',
    nullable: false,
    type: 'timestamp',
  })
  dateTimeOriginal: Date;

  @Column({
    name: 'ExifData',
    type: 'json',
    nullable: false
  })
  exifData: any;

  @ManyToOne(() => ProjectsEntity, { nullable: false })
  @JoinColumn({ name: 'project', referencedColumnName: 'uuid' })
  project: ProjectsEntity
}
