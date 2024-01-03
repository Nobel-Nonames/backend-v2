import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsJSON, IsNotEmpty } from "class-validator"
import UsersEntity from "src/entities/auth/user.entity"

export default class GetUserResponseDto {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ example: true, description: 'response success 정보' })
  success: boolean

  @IsJSON()
  @IsNotEmpty()
  @ApiProperty({
    example: UsersEntity,
    description: '유저 정보'
  })
  users: UsersEntity
}