import { Controller, Get, Post, Body, Patch, Param } from "@nestjs/common";
import { PeriodicityService } from "./periodicity.service";
import { CreatePeriodicityDto } from "./dto/create-periodicity.dto";
import { UpdatePeriodicityDto } from "./dto/update-periodicity.dto";
import { ApiOperation } from "@nestjs/swagger";
import { sendResponse } from "src/utils/send-response";
import { StatusModel } from "types/status.model";

@Controller("periodicity")
export class PeriodicityController {
  constructor(private readonly periodicityService: PeriodicityService) {}

  @Post()
  @ApiOperation({ summary: "Create a new periodicity" })
  async create(@Body() createPeriodicityDto: CreatePeriodicityDto) {
    const data = await this.periodicityService.create(createPeriodicityDto);
    return sendResponse(data, "Periodicity created", StatusModel.SUCCESS);
  }

  @Get()
  @ApiOperation({ summary: "Get all periodicities" })
  async findAll() {
    const data = await this.periodicityService.findAll();
    return sendResponse(data, "Periodicities found", StatusModel.SUCCESS);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a periodicity by id" })
  async findOne(@Param("id") id: string) {
    const data = await this.periodicityService.findOne(+id);
    return sendResponse(data, "Periodicity found", StatusModel.SUCCESS);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a periodicity" })
  async update(
    @Param("id") id: string,
    @Body() updatePeriodicityDto: UpdatePeriodicityDto,
  ) {
    const result = await this.periodicityService.update(
      +id,
      updatePeriodicityDto,
    );
    if (result.affected && result.affected > 0) {
      return sendResponse(null, "Periodicity updated", StatusModel.SUCCESS);
    }
  }

  @Get("state/:id")
  @ApiOperation({ summary: "Change a periodicity state" })
  async changeState(@Param("id") id: string) {
    const result = await this.periodicityService.changeState(+id);
    if (result.affected && result.affected > 0) {
      return sendResponse(
        null,
        "Periodicity state changed",
        StatusModel.SUCCESS,
      );
    }
  }
}
