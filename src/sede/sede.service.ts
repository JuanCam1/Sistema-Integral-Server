import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSedeDto } from "./dto/create-sede.dto";
import { UpdateSedeDto } from "./dto/update-sede.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Sede } from "./entities/sede.entity";
import { Repository } from "typeorm";
import { capitalizeText } from "src/utils/capitalize-text";

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
    createSedeDto.stateId = Number(createSedeDto.stateId);
    return await this.sedeRepository.save(createSedeDto);
  }

  async findAll() {
    return await this.sedeRepository.find({
      where: {
        isDeleted: false,
      },
    });
  }

  async findOne(id: string) {
    return await this.sedeRepository.findOne({
      where: { id, isDeleted: false },
    });
  }

  async update(id: string, updateSedeDto: UpdateSedeDto) {
    const sede = await this.findBySede(id);

    if (!sede) {
      throw new NotFoundException("Sede not found");
    }

    return await this.sedeRepository.update(id, updateSedeDto);
  }

  async remove(id: string) {
    return await this.sedeRepository.update(id, {
      isDeleted: true,
    });
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
