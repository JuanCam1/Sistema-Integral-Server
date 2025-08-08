import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from "@nestjs/common";
import { CreatePeriodicityDto } from "./dto/create-periodicity.dto";
import { UpdatePeriodicityDto } from "./dto/update-periodicity.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Periodicity } from "./entities/periodicity.entity";
import { Repository } from "typeorm";
import { StateNumberModel } from "types/state.model";
import { capitalizeText } from "src/utils/capitalize-text";
import { instanceToPlain } from "class-transformer";

@Injectable()
export class PeriodicityService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Periodicity)
    private readonly periodicityRepository: Repository<Periodicity>,
  ) {}

  async onApplicationBootstrap() {
    const defaultPeriodicity = [
      "Semanal",
      "Quincenal",
      "Mensual",
      "Bimestral",
      "Trimestral",
      "Anual",
      "Bienal",
    ];

    for (const periodicity of defaultPeriodicity) {
      const exists = await this.periodicityRepository.findOne({
        where: { name: periodicity },
      });

      if (!exists) {
        await this.periodicityRepository.save({
          name: periodicity,
          stateId: 1,
        });
      }
    }
  }

  async create(createPeriodicityDto: CreatePeriodicityDto) {
    const capitalizeName = capitalizeText(createPeriodicityDto.name);

    createPeriodicityDto.name = capitalizeName;
    const data = await this.periodicityRepository.save(createPeriodicityDto);

    return instanceToPlain(data);
  }

  async findAll() {
    const data = await this.periodicityRepository.find();
    return instanceToPlain(data);
  }

  async findOne(id: number) {
    const periodicity = await this.findByPeriodicity(id);

    if (!periodicity) {
      throw new NotFoundException("Periodicity not found");
    }

    return instanceToPlain(periodicity);
  }

  async update(id: number, updatePeriodicityDto: UpdatePeriodicityDto) {
    const periodicity = await this.findByPeriodicity(id);

    if (!periodicity) {
      throw new NotFoundException("Periodicity not found");
    }

    const capitalizeName = updatePeriodicityDto.name
      ? capitalizeText(updatePeriodicityDto.name)
      : periodicity.name;

    updatePeriodicityDto.name = capitalizeName;

    const result = await this.periodicityRepository.update(
      id,
      updatePeriodicityDto,
    );

    if (result.affected && result.affected > 0) {
      return true;
    }

    throw new BadRequestException("Periodicity could not be updated");
  }

  async changeState(id: number) {
    const periodicity = await this.findByPeriodicity(id);

    if (!periodicity) {
      throw new NotFoundException("Periodicity not found");
    }

    const currentState = periodicity.stateId as StateNumberModel;

    const result = await this.periodicityRepository.update(id, {
      stateId:
        currentState === StateNumberModel.ACTIVE
          ? StateNumberModel.INACTIVE
          : StateNumberModel.ACTIVE,
    });

    if (result.affected && result.affected > 0) {
      return true;
    }

    throw new BadRequestException("Periodicity could not be updated");
  }

  private async findByPeriodicity(id: number) {
    return await this.periodicityRepository.findOne({
      where: {
        id,
      },
    });
  }
}
