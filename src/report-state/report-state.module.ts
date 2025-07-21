import { Module } from "@nestjs/common";
import { ReportStateService } from "./report-state.service";
import { ReportStateController } from "./report-state.controller";
import { ReportState } from "./entities/report-state.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([ReportState])],
  controllers: [ReportStateController],
  providers: [ReportStateService],
})
export class ReportStateModule {}
