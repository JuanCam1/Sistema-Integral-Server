import { Controller, Get } from "@nestjs/common";
import { UserTypeService } from "./user-type.service";

@Controller("user-type")
export class UserTypeController {
  constructor(private readonly userTypeService: UserTypeService) {}

  @Get()
  async findAll() {
    return await this.userTypeService.findAll();
  }
}
