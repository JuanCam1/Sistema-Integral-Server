import { PartialType } from '@nestjs/mapped-types';
import { CreatePeriodicityDto } from './create-periodicity.dto';

export class UpdatePeriodicityDto extends PartialType(CreatePeriodicityDto) {}
