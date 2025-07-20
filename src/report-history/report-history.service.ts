import { Injectable } from "@nestjs/common";
import { CreateReportHistoryDto } from "./dto/create-report-history.dto";
import { UpdateReportHistoryDto } from "./dto/update-report-history.dto";

@Injectable()
export class ReportHistoryService {
  create(createReportHistoryDto: CreateReportHistoryDto) {
    return "This action adds a new reportHistory";
  }

  findAll() {
    return `This action returns all reportHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reportHistory`;
  }

  update(id: number, updateReportHistoryDto: UpdateReportHistoryDto) {
    return `This action updates a #${id} reportHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} reportHistory`;
  }
}
