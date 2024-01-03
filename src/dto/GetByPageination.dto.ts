import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export default class GetByPageinationDto {
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @ApiProperty({
    description: '페이지네이션에 사용할 page 수',
    example: 0
  })
  page: number;
}