import { Module } from "@nestjs/common";
import { ReportHistoryService } from "./report-history.service";
import { ReportHistoryController } from "./report-history.controller";
import { ReportHistory } from "./entities/report-history.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([ReportHistory])],
  controllers: [ReportHistoryController],
  providers: [ReportHistoryService],
})
export class ReportHistoryModule {}
