import { Module } from '@nestjs/common';
import { ReportHistoryService } from './report-history.service';
import { ReportHistoryController } from './report-history.controller';

@Module({
  controllers: [ReportHistoryController],
  providers: [ReportHistoryService],
})
export class ReportHistoryModule {}
