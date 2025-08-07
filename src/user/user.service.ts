import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { StateModel } from "types/state.model";
import { Image } from "src/image/entities/image.entity";
import { ImageService } from "src/image/image.service";
import { capitalizeText } from "src/utils/capitalize-text";
import { currentDate } from "src/utils/current-date-hour";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly imageService: ImageService,
  ) {}

  async create(createUserDto: CreateUserDto, file: Express.Multer.File) {
    let saveImage: Image | undefined;
    const currentNow = currentDate();

    if (file) {
      saveImage = await this.imageService.create(file);
    }

    const capitalizeName = capitalizeText(createUserDto.name);
    const capitalizeLastname = capitalizeText(createUserDto.lastname);
    const capitalizeProfile = capitalizeText(createUserDto.profile);

    return await this.userRepository.save({
      ...createUserDto,
      name: capitalizeName,
      lastname: capitalizeLastname,
      profile: capitalizeProfile,
      createdAt: currentNow,
      updatedAt: currentNow,
      imageId: saveImage ? saveImage.id : undefined,
    });
  }

  async findAll(id: string) {
    return await this.userRepository.find({
      where: {
        id: Not(id),
        state: {
          name: StateModel.ACTIVE,
        },
        isDeleted: false,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.findByUser(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findByUser(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const user = await this.findByUser(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return await this.userRepository.update(id, {
      isDeleted: true,
    });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  private async findByUser(id: string) {
    return await this.userRepository.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
  }
}
