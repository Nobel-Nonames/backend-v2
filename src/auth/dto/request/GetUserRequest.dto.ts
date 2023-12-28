import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export default class GetUserRequestDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '...',
    description: 'user uuid'
  })
  uuid: string
}