import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Max } from "class-validator";

export default class InspectRequestDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '...',
    description: "이미지의 uuid"
  })
  uuid: string

  @IsNumber()
  @Max(11)
  @IsOptional()
  @ApiProperty({
    example: 11,
    description: "class 아이디(?) 숫자 \n['badger', 'bird', 'boar', 'cat', 'dog', 'leopard_cat', 'marten', 'rabbit', 'raccoon', 'roe_deer', 'water_deer', 'weasel']"
  })
  class?: number
}