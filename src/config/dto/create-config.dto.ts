import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsEmail,
  IsInt,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateConfigDto {
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @ApiProperty()
  id: number;

  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty()
  version: string;

  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty()
  company: string;

  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(2)
  @MaxLength(800)
  @ApiProperty()
  contact: string;

  @Transform(({ value }: { value: string }) => value.trim())
  @IsEmail()
  @ApiProperty()
  email: string;
}
