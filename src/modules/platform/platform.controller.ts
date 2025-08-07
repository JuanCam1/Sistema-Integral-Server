import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PlatformService } from "./platform.service";
import { CreatePlatformDto } from "./dto/create-platform.dto";
import { UpdatePlatformDto } from "./dto/update-platform.dto";
import { ApiOperation } from "@nestjs/swagger";
import { StatusModel } from "types/status.model";
import { sendResponse } from "src/utils/send-response";

@Controller("platform")
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Post()
  @ApiOperation({ summary: "Create a new platform" })
  async create(@Body() createPlatformDto: CreatePlatformDto) {
    const data = await this.platformService.create(createPlatformDto);
    return sendResponse(data, "Platform created", StatusModel.SUCCESS);
  }

  @Get()
  @ApiOperation({ summary: "Get all platforms" })
  async findAll() {
    const data = await this.platformService.findAll();
    return sendResponse(data, "Platforms found", StatusModel.SUCCESS);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a platform by id" })
  async findOne(@Param("id") id: string) {
    const data = await this.platformService.findOne(id);
    return sendResponse(data, "Platform found", StatusModel.SUCCESS);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a platform" })
  async update(
    @Param("id") id: string,
    @Body() updatePlatformDto: UpdatePlatformDto,
  ) {
    const result = await this.platformService.update(id, updatePlatformDto);
    if (result.affected && result.affected > 0) {
      return sendResponse(null, "Platform updated", StatusModel.SUCCESS);
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a platform" })
  async remove(@Param("id") id: string) {
    const result = await this.platformService.remove(id);
    if (result.affected && result.affected > 0) {
      return sendResponse(null, "Platform deleted", StatusModel.SUCCESS);
    }
  }

  @Get("state/:id")
  @ApiOperation({ summary: "Change a platform state" })
  async changeState(@Param("id") id: string) {
    const result = await this.platformService.changeState(id);
    if (result.affected && result.affected > 0) {
      return sendResponse(null, "Platform state changed", StatusModel.SUCCESS);
    }
  }
}
