import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePeriodicityDto {
  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(2)
  @MaxLength(300)
  @ApiProperty()
  name: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @ApiProperty()
  stateId: number;
}
