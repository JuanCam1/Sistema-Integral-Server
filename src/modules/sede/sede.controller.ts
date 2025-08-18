import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { Response } from "express";
import { HttpCode } from "src/utils/http-code";
import { sendResponse } from "src/utils/send-response";
import { validateError } from "src/utils/validate-error";
import { StatusModel } from "types/status.model";
import { CreateSedeDto } from "./dto/create-sede.dto";
import { UpdateSedeDto } from "./dto/update-sede.dto";
import { SedeService } from "./sede.service";

@Controller("sede")
export class SedeController {
  constructor(private readonly sedeService: SedeService) {}

  @Post()
  @ApiOperation({ summary: "Create a new sede" })
  async create(@Body() createSedeDto: CreateSedeDto, @Res() res: Response) {
    try {
      await this.sedeService.create(createSedeDto);
      return sendResponse(
        null,
        "Sede created",
        StatusModel.SUCCESS,
        res,
        HttpCode.CREATED,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Get()
  @ApiOperation({ summary: "Get all sedes" })
  async findAll(
    @Res() res: Response,
    @Query("page") page: string,
    @Query("limit") limit: string,
    @Query("name") name?: string,
    @Query("stateId") stateId?: string,
  ) {
    try {
      const data = await this.sedeService.findAll({
        page: Number(page),
        limit: Number(limit),
        stateId: Number(stateId),
        name,
      });
      return sendResponse(
        data,
        "Sedes found",
        StatusModel.SUCCESS,
        res,
        HttpCode.OK,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Get("findAll")
  @ApiOperation({ summary: "Get all sedes" })
  async findAllSedes(@Res() res: Response) {
    try {
      const data = await this.sedeService.findAllSedes();
      return sendResponse(
        data,
        "Sedes found",
        StatusModel.SUCCESS,
        res,
        HttpCode.OK,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a sede by id" })
  async findOne(@Param("id") id: string, @Res() res: Response) {
    try {
      const data = await this.sedeService.findOne(id);
      return sendResponse(
        data,
        "Sede found",
        StatusModel.SUCCESS,
        res,
        HttpCode.OK,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a sede" })
  async update(
    @Param("id") id: string,
    @Body() updateSedeDto: UpdateSedeDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.sedeService.update(id, updateSedeDto);
      if (result) {
        return sendResponse(
          null,
          "Sede updated",
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
  @ApiOperation({ summary: "Delete a sede" })
  async remove(@Param("id") id: string, @Res() res: Response) {
    try {
      const result = await this.sedeService.remove(id);

      if (result) {
        return sendResponse(
          null,
          "Sede deleted",
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
  @ApiOperation({ summary: "Change a sede state" })
  async changeState(@Param("id") id: string, @Res() res: Response) {
    try {
      const result = await this.sedeService.changeState(id);
      if (result) {
        return sendResponse(
          null,
          "Sede state changed",
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
