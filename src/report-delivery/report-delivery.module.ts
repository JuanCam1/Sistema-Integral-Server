import { Module } from "@nestjs/common";
import { ReportDeliveryService } from "./report-delivery.service";
import { ReportDeliveryController } from "./report-delivery.controller";
import { ReportDelivery } from "./entities/report-delivery.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([ReportDelivery])],
  controllers: [ReportDeliveryController],
  providers: [ReportDeliveryService],
})
export class ReportDeliveryModule {}
