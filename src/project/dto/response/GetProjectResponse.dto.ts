import { ApiProperty } from "@nestjs/swagger";
import ProjectsEntity from "src/entitiy/project/info.entity";

export default class GetProjectResponseDto {
  @ApiProperty({
    description: "성공 여부",
    example: true
  })
  success: boolean;

  @ApiProperty({
    description: "project",
    example: ProjectsEntity,
  })
  project: ProjectsEntity
}