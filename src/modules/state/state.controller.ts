import { Controller, Get, Res } from "@nestjs/common";
import { StateService } from "./state.service";
import { ApiOperation } from "@nestjs/swagger";
import { Response } from "express";
import { HttpCode } from "src/utils/http-code";
import { StatusModel } from "types/status.model";
import { sendResponse } from "src/utils/send-response";
import { validateError } from "src/utils/validate-error";

@Controller("state")
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  @ApiOperation({ summary: "Get all states" })
  async findAll(@Res() res: Response) {
    try {
      const data = await this.stateService.findAll();
      return sendResponse(
        data,
        "State found",
        StatusModel.SUCCESS,
        res,
        HttpCode.OK,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }
}
