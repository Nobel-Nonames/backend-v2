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
  author: UsersEntity;

  @Column({
    name: 'history',
    type: 'text',
    nullable: false
  })
  history: string;

  @Column({
    name: 'Address',
    type: 'text',  // or adjust the type based on your requirements
    nullable: false,
  })
  address: string;

  @Column({
    name: 'ThumnailPath',
    type: 'text',
    nullable: true
  })
  thumnailPath?: string;

  @IsDate()
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    example: "2023-11-29 20:14:29.234751",
    description: "데이터 기입 시간"
  })
  @CreateDateColumn({
    name: 'createdAt',
    nullable: false
  })
  createdAt: Date;

  @IsNotEmpty()
  @Column({
    name: 'ETC',
    type: 'text',
    nullable: false
  })
  etc: string;
}
