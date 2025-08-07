import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsEmail,
  IsInt,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateCompanyDto {
  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(2)
  @MaxLength(300)
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
  phone: string;

  @Transform(({ value }: { value: string }) => value.trim())
  @IsEmail()
  @ApiProperty()
  email: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @ApiProperty()
  stateId: number;
}
