import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { Company } from "./entities/company.entity";
import { capitalizeText } from "src/utils/capitalize-text";
import { StateNumberModel } from "types/state.model";

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const capitalizeName = capitalizeText(createCompanyDto.name);
    const capitalizeAddress = capitalizeText(createCompanyDto.address);

    createCompanyDto.name = capitalizeName;
    createCompanyDto.address = capitalizeAddress;
    return await this.companyRepository.save(createCompanyDto);
  }

  async findAll() {
    return await this.companyRepository.find({
      where: {
        isDeleted: false,
      },
    });
  }

  async findOne(id: string) {
    const company = await this.findByCompany(id);

    if (!company) {
      throw new NotFoundException("Company not found");
    }

    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.findByCompany(id);

    if (!company) {
      throw new NotFoundException("Company not found");
    }

    const capitalizeName = updateCompanyDto.name
      ? capitalizeText(updateCompanyDto.name)
      : company.name;
    const capitalizeAddress = updateCompanyDto.address
      ? capitalizeText(updateCompanyDto.address)
      : company.address;

    updateCompanyDto.name = capitalizeName;
    updateCompanyDto.address = capitalizeAddress;

    const result = await this.companyRepository.update(id, updateCompanyDto);
    if (result.affected && result.affected > 0) {
      return true;
    }

    throw new BadRequestException("Company could not be updated");
  }

  async remove(id: string) {
    const company = await this.findByCompany(id);

    if (!company) {
      throw new NotFoundException("Company not found");
    }

    const result = await this.companyRepository.update(id, {
      isDeleted: true,
    });

    if (result.affected && result.affected > 0) {
      return true;
    }

    throw new BadRequestException("Company could not be deleted");
  }

  async changeState(id: string) {
    const company = await this.findByCompany(id);

    if (!company) {
      throw new NotFoundException("Company not found");
    }

    const currentState = company.stateId as StateNumberModel;

    const result = await this.companyRepository.update(id, {
      stateId:
        currentState === StateNumberModel.ACTIVE
          ? StateNumberModel.INACTIVE
          : StateNumberModel.ACTIVE,
    });

    if (result.affected && result.affected > 0) {
      return true;
    }

    throw new BadRequestException("Company could not be changed state");
  }

  private async findByCompany(id: string) {
    return await this.companyRepository.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
  }
}
