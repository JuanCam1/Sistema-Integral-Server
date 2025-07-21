import { Injectable } from '@nestjs/common';
import { CreateDocumentReportDto } from './dto/create-document-report.dto';
import { UpdateDocumentReportDto } from './dto/update-document-report.dto';

@Injectable()
export class DocumentReportService {
  create(createDocumentReportDto: CreateDocumentReportDto) {
    return 'This action adds a new documentReport';
  }

  findAll() {
    return `This action returns all documentReport`;
  }

  findOne(id: number) {
    return `This action returns a #${id} documentReport`;
  }

  update(id: number, updateDocumentReportDto: UpdateDocumentReportDto) {
    return `This action updates a #${id} documentReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} documentReport`;
  }
}
