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
import { CreatePlatformDto } from "./dto/create-platform.dto";
import { UpdatePlatformDto } from "./dto/update-platform.dto";
import { PlatformService } from "./platform.service";

@Controller("platform")
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Post()
  @ApiOperation({ summary: "Create a new platform" })
  async create(
    @Body() createPlatformDto: CreatePlatformDto,
    @Res() res: Response,
  ) {
    try {
      await this.platformService.create(createPlatformDto);
      return sendResponse(
        null,
        "Platform created",
        StatusModel.SUCCESS,
        res,
        HttpCode.CREATED,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Get()
  @ApiOperation({ summary: "Get all platforms" })
  async findAll(
    @Res() res: Response,
    @Query("page") page: string,
    @Query("limit") limit: string,
    @Query("name") name?: string,
    @Query("stateId") stateId?: string,
  ) {
    try {
      const data = await this.platformService.findAll({
        page: Number(page),
        limit: Number(limit),
        stateId: Number(stateId),
        name,
      });
      return sendResponse(
        data,
        "Platform found",
        StatusModel.SUCCESS,
        res,
        HttpCode.OK,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a platform by id" })
  async findOne(@Param("id") id: string, @Res() res: Response) {
    try {
      const data = await this.platformService.findOne(id);
      return sendResponse(
        data,
        "Platform found",
        StatusModel.SUCCESS,
        res,
        HttpCode.OK,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a platform" })
  async update(
    @Param("id") id: string,
    @Body() updatePlatformDto: UpdatePlatformDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.platformService.update(id, updatePlatformDto);
      if (result) {
        return sendResponse(
          null,
          "Platform updated",
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
  @ApiOperation({ summary: "Delete a platform" })
  async remove(@Param("id") id: string, @Res() res: Response) {
    try {
      const result = await this.platformService.remove(id);

      if (result) {
        return sendResponse(
          null,
          "Platform deleted",
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
  @ApiOperation({ summary: "Change a platform state" })
  async changeState(@Param("id") id: string, @Res() res: Response) {
    try {
      const result = await this.platformService.changeState(id);
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
