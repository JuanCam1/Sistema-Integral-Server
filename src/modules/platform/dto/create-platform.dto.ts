import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePlatformDto {
  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(2)
  @MaxLength(500)
  @ApiProperty()
  website: string;

  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @ApiProperty()
  companyId: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @ApiProperty()
  stateId: number;
}
