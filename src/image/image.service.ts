import { Injectable } from "@nestjs/common";
import { UpdateImageDto } from "./dto/update-image.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Image } from "./entities/image.entity";
import { Repository } from "typeorm";
import { PathConst } from "src/consts/paths-const";
import { extname, join } from "node:path";
import { writeFile } from "node:fs/promises";

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async create(file: Express.Multer.File) {
    if (file) {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
      const savePath = join(PathConst.destinationImages, uniqueName);

      await writeFile(savePath, file.buffer);

      const saveImage = await this.imageRepository.save({
        filename: file.originalname,
        path: savePath,
        mimetype: file.mimetype,
      });

      return saveImage;
    }
    return undefined;
  }

  findAll() {
    return `This action returns all image`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
