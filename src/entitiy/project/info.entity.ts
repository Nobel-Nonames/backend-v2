import { IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import UsersEntity from "../auth/user.entity";

@Entity({ name: 'projects_entity' })
export default class ProjectsEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @Column({
    name: 'ProjectName',
    nullable: false,
    type: 'varchar',
    length: 28
  })
  projectName: string;

  @Column({
    name: 'Status',
    type: 'enum',
    enum: ["Ready", "Uploading", "Upload End", "Analyzing", "finish"],
    nullable: false,
    default: "Ready"
  })
  status: "Ready" | "Uploading" | "Upload End" | "Analyzing" | "finish";

  @ManyToOne(() => UsersEntity, { nullable: false })
  @JoinColumn({ name: 'author', referencedColumnName: 'uuid' })
  author: UsersEntity

  @Column({
    name: 'History',
    type: 'array',
    nullable: true,
    default: []
  })
  history: any[];

  @Column({
    name: 'Address',
    type: 'text',
    nullable: false
  })
  address: string;

  @Column({
    name: 'ThumnailPath',
    nullable: true
  })
  thumnailPath?: string

  @IsDate()
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    example: "2023-11-29 20:14:29.234751",
    description: "데이터 기입 시간"
  })
  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date

  @IsNotEmpty()
  @Column({
    name: 'ETC',
    type: 'json',
    nullable: true,
    default: {}
  })
  etc: any;
}
