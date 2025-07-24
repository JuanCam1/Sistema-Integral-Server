import { Controller, Get, Body, Patch, Param } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { UpdateConfigDto } from "./dto/update-config.dto";
import { ApiOperation } from "@nestjs/swagger";
import { StatusModel } from "types/status.model";
import { sendResponse } from "src/utils/send-response";

@Controller("config")
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  @ApiOperation({ summary: "Get a config by id" })
  async findOne() {
    const data = await this.configService.findOne();
    return sendResponse(data, "Config found", StatusModel.SUCCESS);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a config" })
  async update(
    @Param("id") id: string,
    @Body() updateConfigDto: UpdateConfigDto,
  ) {
    const result = await this.configService.update(+id, updateConfigDto);
    if (result.affected && result.affected > 0) {
      return sendResponse(null, "Config updated", StatusModel.SUCCESS);
    }
  }
}
