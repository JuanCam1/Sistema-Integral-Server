import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SedeService } from "./sede.service";
import { CreateSedeDto } from "./dto/create-sede.dto";
import { UpdateSedeDto } from "./dto/update-sede.dto";
import { StatusModel } from "types/status.model";
import { ApiOperation } from "@nestjs/swagger";
import { sendResponse } from "src/utils/send-response";

@Controller("sede")
export class SedeController {
  constructor(private readonly sedeService: SedeService) {}

  @Post()
  @ApiOperation({ summary: "Create a new sede" })
  async create(@Body() createSedeDto: CreateSedeDto) {
    const data = await this.sedeService.create(createSedeDto);
    return sendResponse(data, "Sede created", StatusModel.SUCCESS);
  }

  @Get()
  @ApiOperation({ summary: "Get all sedes" })
  async findAll() {
    const data = await this.sedeService.findAll();
    return sendResponse(data, "Sedes found", StatusModel.SUCCESS);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a sede by id" })
  async findOne(@Param("id") id: string) {
    const data = await this.sedeService.findOne(id);
    return sendResponse(data, "Sede found", StatusModel.SUCCESS);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a sede" })
  async update(@Param("id") id: string, @Body() updateSedeDto: UpdateSedeDto) {
    const result = await this.sedeService.update(id, updateSedeDto);
    if (result.affected && result.affected > 0) {
      return sendResponse(null, "Sede updated", StatusModel.SUCCESS);
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a sede" })
  async remove(@Param("id") id: string) {
    const result = await this.sedeService.remove(id);
    if (result.affected && result.affected > 0) {
      return sendResponse(null, "Sede deleted", StatusModel.SUCCESS);
    }
  }

  @Get("state/:id")
  @ApiOperation({ summary: "Change a sede state" })
  async changeState(@Param("id") id: string) {
    const result = await this.sedeService.changeState(id);
    if (result.affected && result.affected > 0) {
      return sendResponse(null, "Sede state changed", StatusModel.SUCCESS);
    }
  }
}
