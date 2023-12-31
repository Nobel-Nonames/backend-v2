import { IsNotEmpty, IsNumber, Min } from "class-validator";

export default class GetByPageinationDto {
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  page: number;
}