import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { instanceToPlain } from "class-transformer";
import { capitalizeText } from "src/utils/capitalize-text";
import { FindOptionsWhere, ILike, Repository } from "typeorm";
import { PaginationCompanyModel } from "types/company.model";
import { StateNumberModel } from "types/state.model";
import { CreateSedeDto } from "./dto/create-sede.dto";
import { UpdateSedeDto } from "./dto/update-sede.dto";
import { Sede } from "./entities/sede.entity";

@Injectable()
export class SedeService {
  constructor(
    @InjectRepository(Sede)
    private readonly sedeRepository: Repository<Sede>,
  ) {}

  async create(createSedeDto: CreateSedeDto) {
    const capitalizeName = capitalizeText(createSedeDto.name);
    const capitalizeAddress = capitalizeText(createSedeDto.address);
    const capitalizeUbication = capitalizeText(createSedeDto.ubication);

    createSedeDto.name = capitalizeName;
    createSedeDto.address = capitalizeAddress;
    createSedeDto.ubication = capitalizeUbication;
    const data = await this.sedeRepository.save(createSedeDto);

    return instanceToPlain(data);
  }

  async findAll(params: PaginationCompanyModel) {
    const { page, limit, name, stateId } = params;

    // biome-ignore lint/suspicious/noExplicitAny: any
    const where: FindOptionsWhere<any> = { isDeleted: false };

    if (name) {
      where["name"] = ILike(`%${name}%`);
    }
    if (stateId) {
      where["stateId"] = stateId;
    }

    const [data, total] = await this.sedeRepository.findAndCount({
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
    const sede = await this.findBySede(id);

    if (!sede) {
      throw new NotFoundException("Sede not found");
    }

    return instanceToPlain(sede);
  }

  async update(id: string, updateSedeDto: UpdateSedeDto) {
    const sede = await this.findBySede(id);

    if (!sede) {
      throw new NotFoundException("Sede not found");
    }

    const capitalizeName = updateSedeDto.name
      ? capitalizeText(updateSedeDto.name)
      : sede.name;
    const capitalizeAddress = updateSedeDto.address
      ? capitalizeText(updateSedeDto.address)
      : sede.address;
    const capitalizeUbication = updateSedeDto.ubication
      ? capitalizeText(updateSedeDto.ubication)
      : sede.ubication;

    updateSedeDto.name = capitalizeName;
    updateSedeDto.address = capitalizeAddress;
    updateSedeDto.ubication = capitalizeUbication;
    const result = await this.sedeRepository.update(id, updateSedeDto);

    if (result.affected && result.affected > 0) {
      return true;
    }

    throw new BadRequestException("Sede could not be updated");
  }

  async remove(id: string) {
    const sede = await this.findBySede(id);

    if (!sede) {
      throw new NotFoundException("Sede not found");
    }

    const result = await this.sedeRepository.update(id, {
      isDeleted: true,
    });

    if (result.affected && result.affected > 0) {
      return true;
    }

    throw new BadRequestException("Sede could not be deleted");
  }

  async changeState(id: string) {
    const sede = await this.findBySede(id);

    if (!sede) {
      throw new NotFoundException("Sede not found");
    }

    const currentState = sede.stateId as StateNumberModel;

    const result = await this.sedeRepository.update(id, {
      stateId:
        currentState === StateNumberModel.ACTIVE
          ? StateNumberModel.INACTIVE
          : StateNumberModel.ACTIVE,
    });

    if (result.affected && result.affected > 0) {
      return true;
    }

    throw new BadRequestException("Sede could not be updated");
  }

  private async findBySede(id: string) {
    return await this.sedeRepository.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
  }
}
