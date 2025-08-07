import { Controller, Get, Body, Patch, Param, Res } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { UpdateConfigDto } from "./dto/update-config.dto";
import { ApiOperation } from "@nestjs/swagger";
import { StatusModel } from "types/status.model";
import { sendResponse } from "src/utils/send-response";
import { HttpCode } from "src/utils/http-code";
import { validateError } from "src/utils/validate-error";
import { Response } from "express";

@Controller("config")
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  @ApiOperation({ summary: "Get a config by id" })
  async findOne(@Res() res: Response) {
    try {
      const data = await this.configService.findOne();
      return sendResponse(
        data,
        "Config found",
        StatusModel.SUCCESS,
        res,
        HttpCode.OK,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a config" })
  async update(
    @Param("id") id: string,
    @Body() updateConfigDto: UpdateConfigDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.configService.update(+id, updateConfigDto);
      if (result) {
        return sendResponse(
          null,
          "Config updated",
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
