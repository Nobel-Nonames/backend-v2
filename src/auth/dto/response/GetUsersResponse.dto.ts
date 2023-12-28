import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsJSON, IsNotEmpty } from "class-validator";
import UsersEntity from "src/entitiy/auth/user.entity";

export default class GetUsersResponseDto {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: true,
    description: 'response success 정보'
  })
  success: boolean

  @IsArray()
  @IsJSON()
  @IsNotEmpty()
  @ApiProperty({
    example: [new UsersEntity()],
    description: '유저들 정보'
  })
  users: any
}