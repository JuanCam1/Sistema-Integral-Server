import { Transform } from "class-transformer";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  @Transform(({ value }: { value: string }) => value.trim())
  cedula: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @Transform(({ value }: { value: string }) => value.trim())
  name: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @Transform(({ value }: { value: string }) => value.trim())
  lastname: string;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  @Transform(({ value }: { value: string }) => value.trim())
  phone: string;

  @IsEmail()
  @Transform(({ value }: { value: string }) => value.trim())
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(18)
  @Transform(({ value }: { value: string }) => value.trim())
  password: string;

  @IsString()
  @MinLength(6)
  @MaxLength(18)
  @Transform(({ value }: { value: string }) => value.trim())
  profile: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @Transform(({ value }: { value: string }) => value.trim())
  userTypeId: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @Transform(({ value }: { value: string }) => value.trim())
  areaId: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @Transform(({ value }: { value: string }) => value.trim())
  imageId: string;

  @IsString()
  @MinLength(1)
  @MaxLength(2)
  @Transform(({ value }: { value: string }) => value.trim())
  stateId: string;
}
