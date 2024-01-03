import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export default class UploadImagesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "...",
    description: "project uuid"
  })
  project_id: string

  @ApiProperty({
    description: "이미지 파일들"
  })
  @IsEmpty()
  files: string
}