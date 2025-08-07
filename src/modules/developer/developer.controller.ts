import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from "@nestjs/common";
import { DeveloperService } from "./developer.service";
import { CreateDeveloperDto } from "./dto/create-developer.dto";
import { UpdateDeveloperDto } from "./dto/update-developer.dto";
import { ApiOperation } from "@nestjs/swagger";
import { StatusModel } from "types/status.model";
import { sendResponse } from "src/utils/send-response";
import { HttpCode } from "src/utils/http-code";
import { Response } from "express";
import { validateError } from "src/utils/validate-error";

@Controller("developer")
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}

  @Post()
  @ApiOperation({ summary: "Create a new developer" })
  async create(
    @Body() createDeveloperDto: CreateDeveloperDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.developerService.create(createDeveloperDto);
      return sendResponse(
        data,
        "Developer created",
        StatusModel.SUCCESS,
        res,
        HttpCode.CREATED,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Get()
  @ApiOperation({ summary: "Get all developers" })
  async findAll(@Res() res: Response) {
    try {
      const data = await this.developerService.findAll();
      return sendResponse(
        data,
        "Developers found",
        StatusModel.SUCCESS,
        res,
        HttpCode.OK,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a developer by id" })
  async findOne(@Param("id") id: string, @Res() res: Response) {
    try {
      const data = await this.developerService.findOne(id);
      return sendResponse(
        data,
        "Developer found",
        StatusModel.SUCCESS,
        res,
        HttpCode.OK,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a developer" })
  async update(
    @Param("id") id: string,
    @Body() updateDeveloperDto: UpdateDeveloperDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.developerService.update(id, updateDeveloperDto);
      if (result) {
        return sendResponse(
          null,
          "Developer updated",
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
  @ApiOperation({ summary: "Delete a developer" })
  async remove(@Param("id") id: string, @Res() res: Response) {
    try {
      const result = await this.developerService.remove(id);

      if (result) {
        return sendResponse(
          null,
          "Developer deleted",
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
