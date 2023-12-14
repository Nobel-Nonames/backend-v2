import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export default class SignUpRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "username",
    description: "username: string [아이디]"
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "password",
    description: "password: string [비밀번호]"
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'name',
    description: 'name: string [이름]'
  })
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'userType',
    description: 'userType: user | admin | master [유저 권한]',
    enum: ['user', 'admin', 'master']
  })
  type: 'user' | 'admin' | 'master'
}