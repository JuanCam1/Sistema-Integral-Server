import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DeveloperService } from "./developer.service";
import { CreateDeveloperDto } from "./dto/create-developer.dto";
import { UpdateDeveloperDto } from "./dto/update-developer.dto";
import { ApiOperation } from "@nestjs/swagger";
import { StatusModel } from "types/status.model";
import { sendResponse } from "src/utils/send-response";

@Controller("developer")
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}

  @Post()
  @ApiOperation({ summary: "Create a new developer" })
  async create(@Body() createDeveloperDto: CreateDeveloperDto) {
    const data = await this.developerService.create(createDeveloperDto);
    return sendResponse(data, "Developer created", StatusModel.SUCCESS);
  }

  @Get()
  @ApiOperation({ summary: "Get all developers" })
  async findAll() {
    const data = await this.developerService.findAll();
    return sendResponse(data, "Developers found", StatusModel.SUCCESS);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a developer by id" })
  async findOne(@Param("id") id: string) {
    const data = await this.developerService.findOne(id);
    return sendResponse(data, "Developer found", StatusModel.SUCCESS);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a developer" })
  async update(
    @Param("id") id: string,
    @Body() updateDeveloperDto: UpdateDeveloperDto,
  ) {
    const result = await this.developerService.update(id, updateDeveloperDto);
    if (result.affected && result.affected > 0) {
      return sendResponse(null, "Developer updated", StatusModel.SUCCESS);
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a developer" })
  async remove(@Param("id") id: string) {
    const result = await this.developerService.remove(id);
    if (result.affected && result.affected > 0) {
      return sendResponse(null, "Developer deleted", StatusModel.SUCCESS);
    }
  }
}
