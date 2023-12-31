import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  etc: string;
}