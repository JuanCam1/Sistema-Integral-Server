import { Injectable } from "@nestjs/common";
import { UpdateImageDto } from "./dto/update-image.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Image } from "./entities/image.entity";
import { Repository } from "typeorm";

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async create(file: Express.Multer.File) {
    if (file) {
      const saveImage = await this.imageRepository.save({
        filename: file.originalname,
        path: file.path,
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
