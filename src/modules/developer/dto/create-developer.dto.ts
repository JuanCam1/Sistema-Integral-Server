import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsString, MaxLength, MinLength } from "class-validator";

export class CreateDeveloperDto {
  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @ApiProperty()
  name: string;

  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @ApiProperty()
  lastname: string;

  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @ApiProperty()
  phone: string;

  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @ApiProperty()
  email: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @ApiProperty()
  configId: number;
}
