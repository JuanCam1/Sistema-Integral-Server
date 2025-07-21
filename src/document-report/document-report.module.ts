import { Module } from "@nestjs/common";
import { DocumentReportService } from "./document-report.service";
import { DocumentReportController } from "./document-report.controller";
import { DocumentReport } from "./entities/document-report.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([DocumentReport])],
  controllers: [DocumentReportController],
  providers: [DocumentReportService],
})
export class DocumentReportModule {}
