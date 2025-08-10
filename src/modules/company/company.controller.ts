import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
} from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { StatusModel } from "types/status.model";
import { sendResponse } from "src/utils/send-response";
import { ApiOperation } from "@nestjs/swagger";
import { Response } from "express";
import { HttpCode } from "src/utils/http-code";
import { validateError } from "src/utils/validate-error";

@Controller("company")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: "Create a new company" })
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.companyService.create(createCompanyDto);
      return sendResponse(
        data,
        "Company created",
        StatusModel.SUCCESS,
        res,
        HttpCode.CREATED,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Get()
  @ApiOperation({ summary: "Get all companies" })
  async findAll(
    @Res() res: Response,
    @Query("page") page: string,
    @Query("limit") limit: string,
    @Query("name") name?: string,
    @Query("stateId") stateId?: string,
  ) {
    try {
      const data = await this.companyService.findAll({
        page: Number(page),
        limit: Number(limit),
        stateId: Number(stateId),
        name,
      });
      return sendResponse(
        data,
        "Companies found",
        StatusModel.SUCCESS,
        res,
        HttpCode.OK,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a company by id" })
  async findOne(@Param("id") id: string, @Res() res: Response) {
    try {
      const data = await this.companyService.findOne(id);
      return sendResponse(
        data,
        "Company found",
        StatusModel.SUCCESS,
        res,
        HttpCode.OK,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a company" })
  async update(
    @Param("id") id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.companyService.update(id, updateCompanyDto);
      if (result) {
        return sendResponse(
          null,
          "Company updated",
          StatusModel.SUCCESS,
          res,
          HttpCode.NO_CONTENT,
        );
      }
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a company" })
  async remove(@Param("id") id: string, @Res() res: Response) {
    try {
      const result = await this.companyService.remove(id);

      if (result) {
        return sendResponse(
          null,
          "Company deleted",
          StatusModel.SUCCESS,
          res,
          HttpCode.NO_CONTENT,
        );
      }
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Get("state/:id")
  @ApiOperation({ summary: "Change a company state" })
  async changeState(@Param("id") id: string, @Res() res: Response) {
    try {
      const result = await this.companyService.changeState(id);
      if (result) {
        return sendResponse(
          null,
          "Company state changed",
          StatusModel.SUCCESS,
          res,
          HttpCode.NO_CONTENT,
        );
      }
    } catch (error) {
      return validateError(error, res);
    }
  }
}
