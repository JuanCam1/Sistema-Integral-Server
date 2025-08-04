import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AreaService } from "./area.service";
import { CreateAreaDto } from "./dto/create-area.dto";
import { UpdateAreaDto } from "./dto/update-area.dto";
import { ApiOperation } from "@nestjs/swagger";
import { sendResponse } from "src/utils/send-response";
import { StatusModel } from "types/status.model";

@Controller("area")
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post()
  create(@Body() createAreaDto: CreateAreaDto) {
    return this.areaService.create(createAreaDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all areas" })
  async findAll() {
    const data = await this.areaService.findAll();
    return sendResponse(data, "Areas found", StatusModel.SUCCESS);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.areaService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAreaDto: UpdateAreaDto) {
    return this.areaService.update(+id, updateAreaDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.areaService.remove(+id);
  }

  @Get("state/:id")
  @ApiOperation({ summary: "Change a area state" })
  async changeState(@Param("id") id: string) {
    const result = await this.areaService.changeState(id);
    if (result.affected && result.affected > 0) {
      return sendResponse(null, "Sede state changed", StatusModel.SUCCESS);
    }
  }
}
