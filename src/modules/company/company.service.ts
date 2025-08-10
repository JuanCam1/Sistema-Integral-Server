import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, ILike, Repository } from "typeorm";

import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { Company } from "./entities/company.entity";
import { capitalizeText } from "src/utils/capitalize-text";
import { StateNumberModel } from "types/state.model";
import { instanceToPlain } from "class-transformer";
import { PaginationCompanyModel } from "types/company.model";

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
    const data = await this.companyRepository.save(createCompanyDto);
    return instanceToPlain(data);
  }

  async findAll(params: PaginationCompanyModel) {
    const { page, limit, name, stateId } = params;

    const where: FindOptionsWhere<any> = { isDeleted: false };

    if (name) {
      where["name"] = ILike(`%${name}%`);
    }
    if (stateId) {
      where["stateId"] = stateId;
    }

    const [data, total] = await this.companyRepository.findAndCount({
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
    const company = await this.findByCompany(id);

    if (!company) {
      throw new NotFoundException("Company not found");
    }

    return instanceToPlain(company);
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
