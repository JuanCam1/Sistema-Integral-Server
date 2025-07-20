import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ReportHistoryService } from "./report-history.service";
import { CreateReportHistoryDto } from "./dto/create-report-history.dto";
import { UpdateReportHistoryDto } from "./dto/update-report-history.dto";

@Controller("report-history")
export class ReportHistoryController {
  constructor(private readonly reportHistoryService: ReportHistoryService) {}

  @Post()
  create(@Body() createReportHistoryDto: CreateReportHistoryDto) {
    return this.reportHistoryService.create(createReportHistoryDto);
  }

  @Get()
  findAll() {
    return this.reportHistoryService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.reportHistoryService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateReportHistoryDto: UpdateReportHistoryDto,
  ) {
    return this.reportHistoryService.update(+id, updateReportHistoryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.reportHistoryService.remove(+id);
  }
}
