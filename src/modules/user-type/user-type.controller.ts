import { Controller, Get } from "@nestjs/common";
import { UserTypeService } from "./user-type.service";
import { ApiOperation } from "@nestjs/swagger";

@Controller("user-type")
export class UserTypeController {
  constructor(private readonly userTypeService: UserTypeService) {}

  @Get()
  @ApiOperation({ summary: "Get all user types" })
  async findAll() {
    return await this.userTypeService.findAll();
  }
}
