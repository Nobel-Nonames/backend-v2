import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export default class GetUsersRequestDto {
  @IsNumber()
  @IsNumberString()
  @IsNotEmpty()
  @IsNotEmpty()
  @ApiProperty({
    example: 0,
    description: '페이징'
  })
  page: number

  @IsEnum(["user", "admin", "master", "all"])
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'all',
    description: 'enum, [user, admin, master, all]'
  })
  type: "user" | "admin" | "master" | "all"
}