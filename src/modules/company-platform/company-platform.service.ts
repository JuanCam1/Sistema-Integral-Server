import { Injectable } from "@nestjs/common";
import { CreateCompanyPlatformDto } from "./dto/create-company-platform.dto";
import { UpdateCompanyPlatformDto } from "./dto/update-company-platform.dto";

@Injectable()
export class CompanyPlatformService {
  create(createCompanyPlatformDto: CreateCompanyPlatformDto) {
    return "This action adds a new companyPlatform";
  }

  findAll() {
    return `This action returns all companyPlatform`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyPlatform`;
  }

  update(id: number, updateCompanyPlatformDto: UpdateCompanyPlatformDto) {
    return `This action updates a #${id} companyPlatform`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyPlatform`;
  }
}
