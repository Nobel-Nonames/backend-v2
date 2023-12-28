import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users_entity' })
export default class UsersEntity {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '...',
    description: 'user uuid'
  })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @IsString()
  @IsEnum(['admin', 'master', 'user'])
  @IsNotEmpty()
  @ApiProperty({
    example: "user",
    description: "유저 권한, enum: [user, admin, master]"
  })
  @Column({
    name: 'type',
    type: 'enum',
    enum: ['admin', 'master', 'user'],
    nullable: false,
    default: 'user'
  })
  type: 'admin' | 'master' | 'user';

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'username',
    description: '유저 네임, 아이디로 사용'
  })
  @Column({
    name: 'username',
    type: 'varchar',
    length: 24,
    nullable: false,
    unique: true
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Column({
    name: 'password',
    type: 'text',
    nullable: false
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '성함',
    description: '가입자 성함'
  })
  @Column({
    name: 'name',
    type: 'varchar',
    length: 8,
    nullable: false
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Column({
    name: 'salt',
    type: 'varchar',
    length: 32,
    nullable: false
  })
  salt: string;

  @IsNotEmpty()
  @Column({
    name: 'ETC',
    type: 'json',
    nullable: true
  })
  @ApiProperty({
    example: {},
    description: '그 외 기타 정보'
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
  @Column({
    name: 'createdAt',
    type: 'timestamp',
    nullable: false,
    default: new Date()
  })
  createdAt: Date;
}