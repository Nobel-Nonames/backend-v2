import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Max } from "class-validator";

export default class InspectRequestDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  uuid: string

  @IsNumber()
  @Max(11)
  @IsOptional()
  class?: number
}