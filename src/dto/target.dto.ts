import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class TargetDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "...",
    description: "타겟"
  })
  target: string;
}