import { Controller, Get, Body, Patch, Param, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { sendResponse } from "src/utils/send-response";
import { StatusModel } from "types/status.model";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  async findAll(@Param("id") id: string) {
    try {
      const data = await this.userService.findAll(id);
      return sendResponse(data, "Users found", StatusModel.SUCCESS);
    } catch (error) {
      console.error(error);
      return sendResponse(null, "Users not found", StatusModel.ERROR);
    }
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}
