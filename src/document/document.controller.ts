import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { DocumentService } from "./document.service";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { PathConst } from "src/consts/paths-const";

@Controller("document")
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      limits: { files: 1 },
      storage: diskStorage({
        destination: PathConst.destinationDocuments,
        filename: (req, file, callback) => {
          const uniqueName = `${new Date().getTime()}-${file.originalname}`;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  create(@UploadedFile() file: Express.Multer.File) {
    return this.documentService.create(file);
  }

  @Get()
  findAll() {
    return this.documentService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.documentService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentService.update(+id, updateDocumentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.documentService.remove(+id);
  }
}
