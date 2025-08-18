import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { instanceToPlain } from "class-transformer";
import { FindOptionsWhere, ILike, Repository } from "typeorm";
import { PaginationModel } from "types/pagination.model";
import { StateNumberModel } from "types/state.model";
import { CreatePlatformDto } from "./dto/create-platform.dto";
import { UpdatePlatformDto } from "./dto/update-platform.dto";
import { Platform } from "./entities/platform.entity";

@Injectable()
export class PlatformService {
  constructor(
    @InjectRepository(Platform)
    private readonly platformRepository: Repository<Platform>,
  ) {}

  async create(createPlatformDto: CreatePlatformDto) {
    await this.platformRepository.save(createPlatformDto);
  }

  async findAll(params: PaginationModel) {
    const { page, limit, name, stateId } = params;

    // biome-ignore lint/suspicious/noExplicitAny: any
    let where: FindOptionsWhere<any> = { isDeleted: false };

    if (stateId) {
      where["stateId"] = stateId;
    }

    if (name) {
      where = [
        {
          name: ILike(`%${name}%`),
        },
        {
          company: { name: ILike(`%${name}%`) },
        },
      ];
    }
    const [data, total] = await this.platformRepository.findAndCount({
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
