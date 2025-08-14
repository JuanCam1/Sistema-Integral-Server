import { PartialType } from "@nestjs/swagger";
import { CreateDocumentReportDto } from "./create-document-report.dto";

export class UpdateDocumentReportDto extends PartialType(
  CreateDocumentReportDto,
) {}
