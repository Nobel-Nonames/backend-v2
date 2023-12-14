import { IsNotEmpty, IsString } from "class-validator";

export default class UploadImagesDto {
  @IsString()
  @IsNotEmpty()
  project_id: string
}