import { PartialType } from '@nestjs/swagger';
import { CreateCompanyPlatformDto } from './create-company-platform.dto';

export class UpdateCompanyPlatformDto extends PartialType(CreateCompanyPlatformDto) {}
