import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAreaDto } from "./dto/create-area.dto";
import { UpdateAreaDto } from "./dto/update-area.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Area } from "./entities/area.entity";
import { Repository } from "typeorm";
import { StateNumberModel } from "types/state.model";

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
  ) {}

  create(createAreaDto: CreateAreaDto) {
    return "This action adds a new area";
  }

  async findAll() {
    return await this.areaRepository.find({
      where: {
        isDeleted: false,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} area`;
  }

  update(id: number, updateAreaDto: UpdateAreaDto) {
    return `This action updates a #${id} area`;
  }

  remove(id: number) {
    return `This action removes a #${id} area`;
  }

  async changeState(id: string) {
    const area = await this.findByArea(id);

    if (!area) {
      throw new NotFoundException("Area not found");
    }

    const currentState = area.stateId as StateNumberModel;

    return await this.areaRepository.update(id, {
      stateId:
        currentState === StateNumberModel.ACTIVE
          ? StateNumberModel.INACTIVE
          : StateNumberModel.ACTIVE,
    });
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
