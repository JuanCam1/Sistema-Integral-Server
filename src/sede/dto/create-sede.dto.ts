import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsString, MaxLength, MinLength } from "class-validator";

export class CreateSedeDto {
  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @ApiProperty()
  name: string;

  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty()
  address: string;

  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @ApiProperty()
  ubication: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @ApiProperty()
  stateId: number;
}
