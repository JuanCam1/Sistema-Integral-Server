import { Injectable } from '@nestjs/common';
import { CreateReportStateDto } from './dto/create-report-state.dto';
import { UpdateReportStateDto } from './dto/update-report-state.dto';

@Injectable()
export class ReportStateService {
  create(createReportStateDto: CreateReportStateDto) {
    return 'This action adds a new reportState';
  }

  findAll() {
    return `This action returns all reportState`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reportState`;
  }

  update(id: number, updateReportStateDto: UpdateReportStateDto) {
    return `This action updates a #${id} reportState`;
  }

  remove(id: number) {
    return `This action removes a #${id} reportState`;
  }
}
