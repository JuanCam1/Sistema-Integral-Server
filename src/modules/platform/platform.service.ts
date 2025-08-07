import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePlatformDto } from "./dto/create-platform.dto";
import { UpdatePlatformDto } from "./dto/update-platform.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Platform } from "./entities/platform.entity";
import { Repository } from "typeorm";
import { capitalizeText } from "src/utils/capitalize-text";
import { StateNumberModel } from "types/state.model";

@Injectable()
export class PlatformService {
  constructor(
    @InjectRepository(Platform)
    private readonly platformRepository: Repository<Platform>,
  ) {}

  async create(createPlatformDto: CreatePlatformDto) {
    const capitalizeName = capitalizeText(createPlatformDto.name);

    createPlatformDto.name = capitalizeName;
    return await this.platformRepository.save(createPlatformDto);
  }

  async findAll() {
    return await this.platformRepository.find({
      where: {
        isDeleted: false,
      },
    });
  }

  async findOne(id: string) {
    const platform = await this.findByPlatform(id);

    if (!platform) {
      throw new NotFoundException("Platform not found");
    }

    return platform;
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

    return await this.platformRepository.update(id, updatePlatformDto);
  }

  async remove(id: string) {
    const platform = await this.findByPlatform(id);

    if (!platform) {
      throw new NotFoundException("Platform not found");
    }

    return await this.platformRepository.update(id, {
      isDeleted: true,
    });
  }

  async changeState(id: string) {
    const platform = await this.findByPlatform(id);

    if (!platform) {
      throw new NotFoundException("Platform not found");
    }

    const currentState = platform.stateId as StateNumberModel;

    return await this.platformRepository.update(id, {
      stateId:
        currentState === StateNumberModel.ACTIVE
          ? StateNumberModel.INACTIVE
          : StateNumberModel.ACTIVE,
    });
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
