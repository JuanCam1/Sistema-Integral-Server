import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportStateService } from './report-state.service';
import { CreateReportStateDto } from './dto/create-report-state.dto';
import { UpdateReportStateDto } from './dto/update-report-state.dto';

@Controller('report-state')
export class ReportStateController {
  constructor(private readonly reportStateService: ReportStateService) {}

  @Post()
  create(@Body() createReportStateDto: CreateReportStateDto) {
    return this.reportStateService.create(createReportStateDto);
  }

  @Get()
  findAll() {
    return this.reportStateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportStateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportStateDto: UpdateReportStateDto) {
    return this.reportStateService.update(+id, updateReportStateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportStateService.remove(+id);
  }
}
