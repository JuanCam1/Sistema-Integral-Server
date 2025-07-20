import { Module } from "@nestjs/common";
import { ReportDeliveryService } from "./report-delivery.service";
import { ReportDeliveryController } from "./report-delivery.controller";

@Module({
  controllers: [ReportDeliveryController],
  providers: [ReportDeliveryService],
})
export class ReportDeliveryModule {}
