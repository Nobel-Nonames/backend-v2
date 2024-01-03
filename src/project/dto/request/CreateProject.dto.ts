import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "부산 어디 산 근처",
    description: "프로젝트 이름"
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "부산 수정산 산봉우리",
    description: "위치"
  })
  address: string;

  @IsString()
  @IsOptional()
  etc: string;
}