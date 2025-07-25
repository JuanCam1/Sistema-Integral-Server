import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Document } from "./entities/document.entity";
import { Repository } from "typeorm";
import fs from "node:fs";
import path from "node:path";
import { PathConst } from "src/consts/paths-const";

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  async create(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException("No file uploaded");
    }
    const document = {
      original_name: file.originalname,
      file_url: file.filename,
      mimetype: file.mimetype,
    };

    try {
      return await this.documentRepository.save(document);
    } catch (error) {
      console.error("Error saving document", error);
      this.deleteFile(file.filename);
      throw new InternalServerErrorException("Error saving document");
    }
  }

  findAll() {
    return `This action returns all document`;
  }

  findOne(id: number) {
    return `This action returns a #${id} document`;
  }

  update(id: number, updateDocumentDto: UpdateDocumentDto) {
    return `This action updates a #${id} document`;
  }

  remove(id: number) {
    return `This action removes a #${id} document`;
  }

  private deleteFile(filePath: string) {
    const imagePath = path.join(
      process.cwd(),
      PathConst.destinationDocuments,
      filePath,
    );
    try {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("No se pudo eliminar el archivo:", err);
        }
      });
    } catch (err) {
      console.error("No se pudo eliminar el archivo:", err);
    }
  }
}
