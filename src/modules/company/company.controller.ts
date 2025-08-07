import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { StatusModel } from "types/status.model";
import { sendResponse } from "src/utils/send-response";
import { ApiOperation } from "@nestjs/swagger";

@Controller("company")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: "Create a new company" })
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    const data = await this.companyService.create(createCompanyDto);
    return sendResponse(data, "Company created", StatusModel.SUCCESS);
  }

  @Get()
  @ApiOperation({ summary: "Get all companies" })
  async findAll() {
    const data = await this.companyService.findAll();
    return sendResponse(data, "Companies found", StatusModel.SUCCESS);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a company by id" })
  async findOne(@Param("id") id: string) {
    const data = await this.companyService.findOne(id);
    return sendResponse(data, "Company found", StatusModel.SUCCESS);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a company" })
  async update(
    @Param("id") id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    const result = await this.companyService.update(id, updateCompanyDto);
    if (result.affected && result.affected > 0) {
      return sendResponse(null, "Company updated", StatusModel.SUCCESS);
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a company" })
  async remove(@Param("id") id: string) {
    const result = await this.companyService.remove(id);
    if (result.affected && result.affected > 0) {
      return sendResponse(null, "Company deleted", StatusModel.SUCCESS);
    }
  }

  @Get("state/:id")
  @ApiOperation({ summary: "Change a company state" })
  async changeState(@Param("id") id: string) {
    const result = await this.companyService.changeState(id);
    if (result.affected && result.affected > 0) {
      return sendResponse(null, "Company state changed", StatusModel.SUCCESS);
    }
  }
}
