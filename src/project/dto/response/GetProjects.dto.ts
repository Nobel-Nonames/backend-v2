import { ApiProperty } from "@nestjs/swagger";
import ProjectsEntity from "src/entities/project/info.entity";

export default class GetProjectsResponseDto {
  @ApiProperty({
    description: "성공 여부",
    example: true
  })
  success: boolean;

  @ApiProperty({
    description: "projects",
    example: ProjectsEntity,
    isArray: true
  })
  projects: ProjectsEntity
}