import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDeveloperDto } from "./dto/create-developer.dto";
import { UpdateDeveloperDto } from "./dto/update-developer.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Developer } from "./entities/developer.entity";
import { Repository } from "typeorm";
import { capitalizeText } from "src/utils/capitalize-text";

@Injectable()
export class DeveloperService {
  constructor(
    @InjectRepository(Developer)
    private readonly developerRepository: Repository<Developer>,
  ) {}

  async create(createDeveloperDto: CreateDeveloperDto) {
    const capitalizeName = capitalizeText(createDeveloperDto.name);
    const capitalizeLastname = capitalizeText(createDeveloperDto.lastname);

    createDeveloperDto.name = capitalizeName;
    createDeveloperDto.lastname = capitalizeLastname;
    return await this.developerRepository.save(createDeveloperDto);
  }

  async findAll() {
    return await this.developerRepository.find();
  }

  async findOne(id: string) {
    const sede = await this.findByDev(id);

    if (!sede) {
      throw new NotFoundException("Developer not found");
    }

    return sede;
  }

  async update(id: string, updateDeveloperDto: UpdateDeveloperDto) {
    const sede = await this.findByDev(id);

    if (!sede) {
      throw new NotFoundException("Developer not found");
    }

    const capitalizeName = updateDeveloperDto.name
      ? capitalizeText(updateDeveloperDto.name)
      : sede.name;
    const capitalizeLastname = updateDeveloperDto.lastname
      ? capitalizeText(updateDeveloperDto.lastname)
      : sede.lastname;

    updateDeveloperDto.name = capitalizeName;
    updateDeveloperDto.lastname = capitalizeLastname;
    return await this.developerRepository.update(id, updateDeveloperDto);
  }

  async remove(id: string) {
    const sede = await this.findByDev(id);

    if (!sede) {
      throw new NotFoundException("Developer not found");
    }

    return await this.developerRepository.delete(id);
  }

  private async findByDev(id: string) {
    return await this.developerRepository.findOne({
      where: {
        id,
      },
    });
  }
}
