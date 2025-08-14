import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { instanceToPlain } from "class-transformer";
import { FindOptionsWhere, ILike, Repository } from "typeorm";
import { PaginationAreaModel } from "types/area.model";
import { PaginationModel } from "types/pagination.model";
import { StateNumberModel } from "types/state.model";
import { CreateAreaDto } from "./dto/create-area.dto";
import { UpdateAreaDto } from "./dto/update-area.dto";
import { Area } from "./entities/area.entity";

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
  ) {}

  create(createAreaDto: CreateAreaDto) {
    return "This action adds a new area " + JSON.stringify(createAreaDto);
  }

  async findAll(params: PaginationAreaModel) {
    const { page, limit, name, stateId, sedeId } = params;

    // biome-ignore lint/suspicious/noExplicitAny: any
    const where: FindOptionsWhere<any> = { isDeleted: false };

    if (name) {
      where["name"] = ILike(`%${name}%`);
    }
    if (stateId) {
      where["stateId"] = stateId;
    }
    if (sedeId) {
      where["sedeId"] = sedeId;
    }

    const [data, total] = await this.areaRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: instanceToPlain(data),
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const area = await this.findByArea(id);
    if (!area) {
      throw new NotFoundException("Area not found");
    }

    return instanceToPlain(area);
  }

  update(id: string, updateAreaDto: UpdateAreaDto) {
    console.log(
      `This action updates a #${id} area  ${JSON.stringify(updateAreaDto)}`,
    );
    return true;
  }

  remove(id: string) {
    return `This action removes a #${id} area`;
  }

  async changeState(id: string) {
    const area = await this.findByArea(id);

    if (!area) {
      throw new NotFoundException("Area not found");
    }

    const currentState = area.stateId as StateNumberModel;

    const result = await this.areaRepository.update(id, {
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

  private async findByArea(id: string) {
    return await this.areaRepository.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
  }
}
