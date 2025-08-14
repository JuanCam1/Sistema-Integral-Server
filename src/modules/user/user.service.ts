import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { instanceToPlain } from "class-transformer";
import { Image } from "src/modules/image/entities/image.entity";
import { ImageService } from "src/modules/image/image.service";
import { capitalizeText } from "src/utils/capitalize-text";
import { currentDate } from "src/utils/current-date-hour";
import { FindOptionsWhere, ILike, Not, Repository } from "typeorm";
import { StateModel, StateNumberModel } from "types/state.model";
import { PaginationUserModel } from "types/user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

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

    const data = await this.userRepository.save({
      ...createUserDto,
      name: capitalizeName,
      lastname: capitalizeLastname,
      profile: capitalizeProfile,
      createdAt: currentNow,
      updatedAt: currentNow,
      imageId: saveImage ? saveImage.id : undefined,
    });

    return instanceToPlain(data);
  }

  async findAllExceptId(params: PaginationUserModel) {
    const { id, limit, page, name, stateId } = params;

    // biome-ignore lint/suspicious/noExplicitAny: any
    let where: FindOptionsWhere<any> = {
      isDeleted: false,
      id: Not(id),
    };

    if (stateId) {
      where["stateId"] = stateId;
    }

    if (name) {
      where = [
        {
          name: ILike(`%${name}%`),
        },
        {
          cedula: ILike(`%${name}%`),
        },
        {
          email: ILike(`%${name}%`),
        },
        {
          profile: ILike(`%${name}%`),
        },
        {
          area: { name: ILike(`%${name}%`) },
        },
        {
          userType: { name: ILike(`%${name}%`) },
        },
      ];
    }

    const [data, total] = await this.userRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: instanceToPlain(data),
      total,
      currentPage: page,
      totalPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const user = await this.findByUser(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return instanceToPlain(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findByUser(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const result = await this.userRepository.update(id, updateUserDto);
    if (result.affected && result.affected > 0) {
      return true;
    }

    throw new BadRequestException("User could not be updated");
  }

  async remove(id: string) {
    const user = await this.findByUser(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const result = await this.userRepository.update(id, {
      isDeleted: true,
    });

    if (result.affected && result.affected > 0) {
      return true;
    }

    throw new BadRequestException("User could not be deleted");
  }

  async changeState(id: string) {
    const user = await this.findByUser(id);

    if (!user) {
      throw new NotFoundException("Sede not found");
    }

    const currentState = user.stateId as StateNumberModel;

    const result = await this.userRepository.update(id, {
      stateId:
        currentState === StateNumberModel.ACTIVE
          ? StateNumberModel.INACTIVE
          : StateNumberModel.ACTIVE,
    });

    if (result.affected && result.affected > 0) {
      return true;
    }

    throw new BadRequestException("User could not be changed state");
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
