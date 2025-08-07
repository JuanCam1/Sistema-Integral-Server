import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { sendResponse } from "src/utils/send-response";
import { StatusModel } from "types/status.model";
import { ApiOperation } from "@nestjs/swagger";
import { Response } from "express";
import { validateError } from "src/utils/validate-error";
import { HttpCode } from "src/utils/http-code";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  @ApiOperation({ summary: "Get a user by id" })
  async findAllExceptId(@Param("id") id: string, @Res() res: Response) {
    try {
      const data = await this.userService.findAllExceptId(id);
      return sendResponse(
        data,
        "Users found",
        StatusModel.SUCCESS,
        res,
        HttpCode.OK,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a user by id" })
  async findOne(@Param("id") id: string, @Res() res: Response) {
    try {
      const data = await this.userService.findOne(id);
      return sendResponse(
        data,
        "User found",
        StatusModel.SUCCESS,
        res,
        HttpCode.OK,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Get("state/:id")
  @ApiOperation({ summary: "Change a user state" })
  async changeState(@Param("id") id: string, @Res() res: Response) {
    try {
      const result = await this.userService.changeState(id);
      if (result) {
        return sendResponse(
          null,
          "User state changed",
          StatusModel.SUCCESS,
          res,
          HttpCode.NO_CONTENT,
        );
      }
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a user" })
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.userService.update(id, updateUserDto);
      if (result) {
        return sendResponse(
          null,
          "User updated",
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
  @ApiOperation({ summary: "Delete a user" })
  async remove(@Param("id") id: string, @Res() res: Response) {
    try {
      const result = await this.userService.remove(id);
      if (result) {
        return sendResponse(
          null,
          "User deleted",
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
