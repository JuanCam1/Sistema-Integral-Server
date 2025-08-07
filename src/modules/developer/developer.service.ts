import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
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
    const developer = await this.findByDev(id);

    if (!developer) {
      throw new NotFoundException("Developer not found");
    }

    return developer;
  }

  async update(id: string, updateDeveloperDto: UpdateDeveloperDto) {
    const developer = await this.findByDev(id);

    if (!developer) {
      throw new NotFoundException("Developer not found");
    }

    const capitalizeName = updateDeveloperDto.name
      ? capitalizeText(updateDeveloperDto.name)
      : developer.name;
    const capitalizeLastname = updateDeveloperDto.lastname
      ? capitalizeText(updateDeveloperDto.lastname)
      : developer.lastname;

    updateDeveloperDto.name = capitalizeName;
    updateDeveloperDto.lastname = capitalizeLastname;
    const result = await this.developerRepository.update(
      id,
      updateDeveloperDto,
    );

    if (result.affected && result.affected > 0) {
      return true;
    }

    throw new BadRequestException("Developer could not be updated");
  }

  async remove(id: string) {
    const developer = await this.findByDev(id);

    if (!developer) {
      throw new NotFoundException("Developer not found");
    }

    const result = await this.developerRepository.delete(id);

    if (result.affected && result.affected > 0) {
      return true;
    }

    throw new BadRequestException("Developer could not be deleted");
  }

  private async findByDev(id: string) {
    return await this.developerRepository.findOne({
      where: {
        id,
      },
    });
  }
}
