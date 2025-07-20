import { PartialType } from '@nestjs/mapped-types';
import { CreateReportHistoryDto } from './create-report-history.dto';

export class UpdateReportHistoryDto extends PartialType(CreateReportHistoryDto) {}
