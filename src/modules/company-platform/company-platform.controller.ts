import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CompanyPlatformService } from "./company-platform.service";
import { CreateCompanyPlatformDto } from "./dto/create-company-platform.dto";
import { UpdateCompanyPlatformDto } from "./dto/update-company-platform.dto";

@Controller("company-platform")
export class CompanyPlatformController {
  constructor(
    private readonly companyPlatformService: CompanyPlatformService,
  ) {}

  @Post()
  create(@Body() createCompanyPlatformDto: CreateCompanyPlatformDto) {
    return this.companyPlatformService.create(createCompanyPlatformDto);
  }

  @Get()
  findAll() {
    return this.companyPlatformService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.companyPlatformService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCompanyPlatformDto: UpdateCompanyPlatformDto,
  ) {
    return this.companyPlatformService.update(+id, updateCompanyPlatformDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.companyPlatformService.remove(+id);
  }
}
