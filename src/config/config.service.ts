import {
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from "@nestjs/common";
import { UpdateConfigDto } from "./dto/update-config.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Config } from "./entities/config.entity";
import { Repository } from "typeorm";
import { capitalizeText } from "src/utils/capitalize-text";

@Injectable()
export class ConfigService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>,
  ) {}

  async onApplicationBootstrap() {
    const defaultConfig = {
      id: 1,
      version: "1.0.0",
      company: "Juan Rojas",
      contact: "3166389048",
      email: "jkl32@gmail.com",
    };

    const exists = await this.configRepository.findOne({
      where: { id: defaultConfig.id },
    });

    if (!exists) {
      await this.configRepository.save(defaultConfig);
    }
  }

  async findOne(id: number) {
    return await this.configRepository.findOne({
      where: { id },
      relations: ["developers"],
    });
  }

  async update(id: number, updateConfigDto: UpdateConfigDto) {
    const config = await this.findByConfig(id);

    if (!config) {
      throw new NotFoundException("Configuration not found");
    }

    const capitalizeName = updateConfigDto.company
      ? capitalizeText(updateConfigDto.company)
      : config.company;

    updateConfigDto.company = capitalizeName;

    return await this.configRepository.update(id, updateConfigDto);
  }

  private async findByConfig(id: number) {
    return await this.configRepository.findOne({
      where: {
        id,
      },
    });
  }
}
