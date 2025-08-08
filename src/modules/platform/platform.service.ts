import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreatePlatformDto } from "./dto/create-platform.dto";
import { UpdatePlatformDto } from "./dto/update-platform.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Platform } from "./entities/platform.entity";
import { Repository } from "typeorm";
import { capitalizeText } from "src/utils/capitalize-text";
import { StateNumberModel } from "types/state.model";
import { instanceToPlain } from "class-transformer";

@Injectable()
export class PlatformService {
  constructor(
    @InjectRepository(Platform)
    private readonly platformRepository: Repository<Platform>,
  ) {}

  async create(createPlatformDto: CreatePlatformDto) {
    const capitalizeName = capitalizeText(createPlatformDto.name);

    createPlatformDto.name = capitalizeName;
    const data = await this.platformRepository.save(createPlatformDto);

    return instanceToPlain(data);
  }

  async findAll() {
    const data = await this.platformRepository.find({
      where: {
        isDeleted: false,
      },
    });

    return instanceToPlain(data);
  }

  async findOne(id: string) {
    const platform = await this.findByPlatform(id);

    if (!platform) {
      throw new NotFoundException("Platform not found");
    }

    return instanceToPlain(platform);
  }

  async update(id: string, updatePlatformDto: UpdatePlatformDto) {
    const platform = await this.findByPlatform(id);

    if (!platform) {
      throw new NotFoundException("Platform not found");
    }

    const capitalizeName = updatePlatformDto.name
      ? capitalizeText(updatePlatformDto.name)
      : Platform.name;

    updatePlatformDto.name = capitalizeName;

    const result = await this.platformRepository.update(id, updatePlatformDto);

    if (result.affected && result.affected > 0) {
      return true;
    }

    throw new BadRequestException("Platform could not be updated");
  }

  async remove(id: string) {
    const platform = await this.findByPlatform(id);

    if (!platform) {
      throw new NotFoundException("Platform not found");
    }

    const result = await this.platformRepository.update(id, {
      isDeleted: true,
    });

    if (result.affected && result.affected > 0) {
      return true;
    }

    throw new BadRequestException("Platform could not be deleted");
  }

  async changeState(id: string) {
    const platform = await this.findByPlatform(id);

    if (!platform) {
      throw new NotFoundException("Platform not found");
    }

    const currentState = platform.stateId as StateNumberModel;

    const result = await this.platformRepository.update(id, {
      stateId:
        currentState === StateNumberModel.ACTIVE
          ? StateNumberModel.INACTIVE
          : StateNumberModel.ACTIVE,
    });

    if (result.affected && result.affected > 0) {
      return true;
    }

    throw new BadRequestException("Platform could not be updated");
  }

  private async findByPlatform(id: string) {
    return await this.platformRepository.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
  }
}
