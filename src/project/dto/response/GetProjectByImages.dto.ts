import { ApiProperty } from "@nestjs/swagger";
import ImagesEntity from "src/entitiy/images/image.entity";

export default class GetProjectByImagesDto {
  @ApiProperty({
    example: true,
    description: "api 성공 여부"
  })
  success: boolean;

  @ApiProperty({
    example: ImagesEntity,
    isArray: true,
    description: "이미지 리스트"
  })
  images: ImagesEntity[]
}