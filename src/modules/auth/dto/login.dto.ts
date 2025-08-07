import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
  @IsEmail()
  @Transform(({ value }: { value: string }) => value.trim())
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }: { value: string }) => value.trim())
  @ApiProperty()
  password: string;
}
