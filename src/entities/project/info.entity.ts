import { IsDate, IsDateString, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import UsersEntity from "../auth/user.entity";
import ImagesEntity from "../images/image.entity";

@Entity({ name: 'projects_entity' })
export default class ProjectsEntity {
  @ApiProperty({
    description: "project uuid",
    example: "..."
  })
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @ApiProperty({
    description: "프로젝트 이름 최대 28자",
    example: "..."
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(28)
  @Column({
    name: 'ProjectName',
    nullable: false,
    type: 'varchar',
    length: 28
  })
  projectName: string;

  @ApiProperty({
    description: "프로젝트 현재 스테이터스",
    example: `["Ready", "Uploading", "Upload End", "Analyzing", "finish"]`
  })
  @Column({
    name: 'Status',
    type: 'enum',
    enum: ["Ready", "Uploading", "Upload End", "Analyzing", "finish"],
    nullable: false,
    default: "Ready"
  })
  status: "Ready" | "Uploading" | "Upload End" | "Analyzing" | "finish";

  @ApiProperty({
    description: "프로젝트 만든 사람",
    example: UsersEntity
  })
  @ManyToOne(() => UsersEntity, { nullable: false })
  @JoinColumn({ name: 'author', referencedColumnName: 'uuid' })
  author: UsersEntity;

  @ApiProperty({
    description: "이미지 위치",
    example: "..."
  })
  @Column({
    name: 'Address',
    type: 'text',  // or adjust the type based on your requirements
    nullable: false,
  })
  address: string;

  @ApiProperty({
    description: "썸네일 이미지",
    type: () => ImagesEntity
  })
  @ManyToOne(() => ImagesEntity, { nullable: true })
  @JoinColumn({ name: 'ThumnailImage', referencedColumnName: 'uuid' })
  ThumnailImage?: ImagesEntity;

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
}
