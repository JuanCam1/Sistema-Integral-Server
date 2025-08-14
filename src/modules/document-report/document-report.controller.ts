import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DocumentReportService } from "./document-report.service";
import { CreateDocumentReportDto } from "./dto/create-document-report.dto";
import { UpdateDocumentReportDto } from "./dto/update-document-report.dto";

@Controller("document-report")
export class DocumentReportController {
  constructor(private readonly documentReportService: DocumentReportService) {}

  @Post()
  create(@Body() createDocumentReportDto: CreateDocumentReportDto) {
    return this.documentReportService.create(createDocumentReportDto);
  }

  @Get()
  findAll() {
    return this.documentReportService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.documentReportService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDocumentReportDto: UpdateDocumentReportDto,
  ) {
    return this.documentReportService.update(+id, updateDocumentReportDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.documentReportService.remove(+id);
  }
}
