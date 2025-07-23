import {
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
    return await this.periodicityRepository.save(createPeriodicityDto);
  }

  async findAll() {
    return await this.periodicityRepository.find();
  }

  async findOne(id: number) {
    const periodicity = await this.findByPeriodicity(id);

    if (!periodicity) {
      throw new NotFoundException("Periodicity not found");
    }

    return periodicity;
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

    return await this.periodicityRepository.update(id, updatePeriodicityDto);
  }

  async changeState(id: number) {
    const periodicity = await this.findByPeriodicity(id);

    if (!periodicity) {
      throw new NotFoundException("Periodicity not found");
    }

    const currentState = periodicity.stateId as StateNumberModel;

    return await this.periodicityRepository.update(id, {
      stateId:
        currentState === StateNumberModel.ACTIVE
          ? StateNumberModel.INACTIVE
          : StateNumberModel.ACTIVE,
    });
  }

  private async findByPeriodicity(id: number) {
    return await this.periodicityRepository.findOne({
      where: {
        id,
      },
    });
  }
}
