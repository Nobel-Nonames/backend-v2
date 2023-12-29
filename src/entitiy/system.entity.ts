import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'system_entity' })
export default class SystemEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @IsNotEmpty()
  @Column({
    name: 'event_number',
    type: 'int',
    nullable: false,
    default: 0
  })
  event_number: number;

  @IsNotEmpty()
  @ApiProperty({
    example: "2023-11-29 20:14:29.234751",
    description: "데이터 기입 시간"
  })
  @CreateDateColumn({
    name: 'createdAt',
    nullable: false
  })
  createdAt: Date
}
