import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportDeliveryService } from './report-delivery.service';
import { CreateReportDeliveryDto } from './dto/create-report-delivery.dto';
import { UpdateReportDeliveryDto } from './dto/update-report-delivery.dto';

@Controller('report-delivery')
export class ReportDeliveryController {
  constructor(private readonly reportDeliveryService: ReportDeliveryService) {}

  @Post()
  create(@Body() createReportDeliveryDto: CreateReportDeliveryDto) {
    return this.reportDeliveryService.create(createReportDeliveryDto);
  }

  @Get()
  findAll() {
    return this.reportDeliveryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportDeliveryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDeliveryDto: UpdateReportDeliveryDto) {
    return this.reportDeliveryService.update(+id, updateReportDeliveryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportDeliveryService.remove(+id);
  }
}
