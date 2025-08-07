import { Controller, Get, Post, Body, Patch, Param, Res } from "@nestjs/common";
import { PeriodicityService } from "./periodicity.service";
import { CreatePeriodicityDto } from "./dto/create-periodicity.dto";
import { UpdatePeriodicityDto } from "./dto/update-periodicity.dto";
import { ApiOperation } from "@nestjs/swagger";
import { sendResponse } from "src/utils/send-response";
import { StatusModel } from "types/status.model";
import { HttpCode } from "src/utils/http-code";
import { validateError } from "src/utils/validate-error";
import { Response } from "express";

@Controller("periodicity")
export class PeriodicityController {
  constructor(private readonly periodicityService: PeriodicityService) {}

  @Post()
  @ApiOperation({ summary: "Create a new periodicity" })
  async create(
    @Body() createPeriodicityDto: CreatePeriodicityDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.periodicityService.create(createPeriodicityDto);
      return sendResponse(
        data,
        "Periodicity created",
        StatusModel.SUCCESS,
        res,
        HttpCode.CREATED,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Get()
  @ApiOperation({ summary: "Get all periodicities" })
  async findAll(@Res() res: Response) {
    try {
      const data = await this.periodicityService.findAll();
      return sendResponse(
        data,
        "Periodicity found",
        StatusModel.SUCCESS,
        res,
        HttpCode.OK,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a periodicity by id" })
  async findOne(@Param("id") id: string, @Res() res: Response) {
    try {
      const data = await this.periodicityService.findOne(+id);
      return sendResponse(
        data,
        "Periodicity found",
        StatusModel.SUCCESS,
        res,
        HttpCode.OK,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a periodicity" })
  async update(
    @Param("id") id: string,
    @Body() updatePeriodicityDto: UpdatePeriodicityDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.periodicityService.update(
        +id,
        updatePeriodicityDto,
      );
      if (result) {
        return sendResponse(
          null,
          "Periodicity updated",
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
  @ApiOperation({ summary: "Change a periodicity state" })
  async changeState(@Param("id") id: string, @Res() res: Response) {
    try {
      const result = await this.periodicityService.changeState(+id);
      if (result) {
        return sendResponse(
          null,
          "Periodicity state changed",
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
