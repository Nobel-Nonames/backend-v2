import mongoose, { Document, HydratedDocument } from "mongoose";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import ProjectsEntity from "../project/info.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'images_entity' })
export default class ImagesEntity {
  @ApiProperty({
    example: '...',
    description: "이미지 uuid"
  })
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @ApiProperty({
    example: '...',
    description: "시리얼 파일 네임"
  })
  @Column({
    name: 'serial_filename',
    type: 'text',
    nullable: false
  })
  serialFileName: string;

  @ApiProperty({
    example: '...',
    description: "파일 이름"
  })
  @Column({
    name: 'FileName',
    type: 'text',
    nullable: false
  })
  fileName: string;

  @ApiProperty({
    example: '...',
    description: "파일 위치"
  })
  @Column({
    name: 'FilePath',
    type: 'text',
    nullable: false
  })
  filePath: string;

  @ApiProperty({
    example: '...',
    description: "파일 시리얼 넘버"
  })
  @Column({
    name: 'SerialNumber',
    type: 'text',
    nullable: false
  })
  serialNumber: string;

  @ApiProperty({
    example: '...',
    description: "오리지널 이미지 저장날짜"
  })
  @Column({
    name: 'DateTimeOriginal',
    nullable: false,
    type: 'timestamp'
  })
  dateTimeOriginal: Date;

  @ApiProperty({
    example: '...',
    description: "분석 후 표시해야할 박스 위치"
  })
  @Column({
    name: 'x1',
    type: 'double',
    nullable: true,
    default: -1
  })
  x1: number;

  @ApiProperty({
    example: '...',
    description: "분석 후 표시해야할 박스 위치"
  })
  @Column({
    name: 'y1',
    type: 'double',
    nullable: true,
    default: -1
  })
  y1: number;

  @ApiProperty({
    example: '...',
    description: "분석 후 표시해야할 박스 위치"
  })
  @Column({
    name: 'x2',
    type: 'double',
    nullable: true,
    default: -1
  })
  x2: number;

  @ApiProperty({
    example: '...',
    description: "분석 후 표시해야할 박스 위치"
  })
  @Column({
    name: 'y2',
    type: 'double',
    nullable: true,
    default: -1
  })
  y2: number;

  @ApiProperty({
    example: '...',
    description: "exif 분석 후 나온 데이터"
  })
  @Column({
    name: 'ExifData',
    type: 'json',
    nullable: false
  })
  exifData: any;

  @ApiProperty({
    example: '...',
    description: "프로젝트"
  })
  @ManyToOne(() => ProjectsEntity, { nullable: false })
  @JoinColumn({ name: 'project', referencedColumnName: 'uuid' })
  project: ProjectsEntity;

  @Column({
    name: 'BestClass',
    type: 'text',
    nullable: true
  })
  bestClass?: string;

  @ApiProperty({
    example: 0,
    description: "이벤트 넘버"
  })
  @Column({
    name: 'evtnum',
    type: 'int',
    nullable: false,
    default: 0
  })
  evtNum: number;

  @ApiProperty({
    example: '...',
    description: "이벤트 기반 저장 날짜"
  })
  @Column({
    name: 'evtDate',
    type: 'timestamp',
    nullable: false
  })
  evtDate: Date;

  @ApiProperty({
    example: '...',
    description: "검수 했는지 안했는지"
  })
  @Column({
    name: 'modifyFlag',
    type: 'boolean',
    default: false
  })
  modifyFlag: Boolean;

  @ApiProperty({
    example: '...',
    description: "권한\"유저\"에서 볼 수 있는지"
  })
  @Column({
    name: 'searchFlag',
    type: 'bool',
    default: false
  })
  searchFlag: Boolean;

  @ApiProperty({
    example: '...',
    description: "인공지능을 돌렸을 때 확률이 가장 높은 동물의 %"
  })
  @Column({
    name: 'bestprob',
    type: 'int',
    default: -1
  })
  bestprob: number;

  @ApiProperty({
    example: '...',
    description: "인공지능을 돌렸을 때 확률이 가장 높은 동물"
  })
  @Column({
    name: 'ClassName',
    type: 'text',
    nullable: true
  })
  className: string;

  @ApiProperty({
    example: '...',
    description: "인공지능을 돌렸을 때 동물이 몇마리나 있을지"
  })
  @Column({
    name: 'Count',
    type: 'int',
    nullable: true,
    default: -1
  })
  count: number;
}
