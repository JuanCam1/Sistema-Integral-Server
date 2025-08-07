import { PartialType } from "@nestjs/mapped-types";
import { CreateReportDeliveryDto } from "./create-report-delivery.dto";

export class UpdateReportDeliveryDto extends PartialType(
  CreateReportDeliveryDto,
) {}
