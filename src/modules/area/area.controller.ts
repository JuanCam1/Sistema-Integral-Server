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
import { AreaService } from "./area.service";
import { CreateAreaDto } from "./dto/create-area.dto";
import { UpdateAreaDto } from "./dto/update-area.dto";

@Controller("area")
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post()
  create(@Body() createAreaDto: CreateAreaDto, @Res() res: Response) {
    try {
      const data = this.areaService.create(createAreaDto);
      return sendResponse(
        data,
        "Area created",
        StatusModel.SUCCESS,
        res,
        HttpCode.CREATED,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Get()
  @ApiOperation({ summary: "Get all areas" })
  async findAll(@Res() res: Response,
@Query("page") page: string,
    @Query("limit") limit: string,
    @Query("name") name?: string,
    @Query("stateId") stateId?: string,
    @Query("sedeId") sedeId?: string,) {
    try {
      const data = await this.areaService.findAll({
        page: Number(page),
        limit: Number(limit),
        stateId: Number(stateId),
        sedeId: sedeId,
        name,
      });

      return sendResponse(
        data,
        "Areas found",
        StatusModel.SUCCESS,
        res,
        HttpCode.OK,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Res() res: Response) {
    try {
      const data = await this.areaService.findOne(id);

      return sendResponse(
        data,
        "Area found",
        StatusModel.SUCCESS,
        res,
        HttpCode.CREATED,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateAreaDto: UpdateAreaDto,
    @Res() res: Response,
  ) {
    try {
      const result = this.areaService.update(id, updateAreaDto);

      if (result) {
        return sendResponse(
          null,
          "Area updated",
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
  remove(@Param("id") id: string, @Res() res: Response) {
    try {
      const result = this.areaService.remove(id);

      if (result) {
        return sendResponse(
          null,
          "Area deleted",
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
  @ApiOperation({ summary: "Change a area state" })
  async changeState(@Param("id") id: string, @Res() res: Response) {
    try {
      const result = await this.areaService.changeState(id);
      if (result) {
        return sendResponse(
          null,
          "Area state changed",
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
