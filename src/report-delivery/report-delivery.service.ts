import { Injectable } from '@nestjs/common';
import { CreateReportDeliveryDto } from './dto/create-report-delivery.dto';
import { UpdateReportDeliveryDto } from './dto/update-report-delivery.dto';

@Injectable()
export class ReportDeliveryService {
  create(createReportDeliveryDto: CreateReportDeliveryDto) {
    return 'This action adds a new reportDelivery';
  }

  findAll() {
    return `This action returns all reportDelivery`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reportDelivery`;
  }

  update(id: number, updateReportDeliveryDto: UpdateReportDeliveryDto) {
    return `This action updates a #${id} reportDelivery`;
  }

  remove(id: number) {
    return `This action removes a #${id} reportDelivery`;
  }
}
