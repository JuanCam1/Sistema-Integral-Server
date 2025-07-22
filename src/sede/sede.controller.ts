import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpStatus,
} from "@nestjs/common";
import { SedeService } from "./sede.service";
import { CreateSedeDto } from "./dto/create-sede.dto";
import { UpdateSedeDto } from "./dto/update-sede.dto";
import { StatusModel } from "types/status.model";
import { ApiOperation } from "@nestjs/swagger";

@Controller("sede")
export class SedeController {
  constructor(private readonly sedeService: SedeService) {}

  @Post()
  @ApiOperation({ summary: "Create a new sede" })
  async create(@Body() createSedeDto: CreateSedeDto) {
    const data = await this.sedeService.create(createSedeDto);
    return {
      data,
      message: "Sede created",
      state: StatusModel.SUCCESS,
      codeError: HttpStatus.CREATED,
    };
  }

  @Get()
  @ApiOperation({ summary: "Get all sedes" })
  async findAll() {
    const data = await this.sedeService.findAll();
    return {
      data,
      message: "Sedes found",
      state: StatusModel.SUCCESS,
      codeError: HttpStatus.OK,
    };
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a sede by id" })
  async findOne(@Param("id") id: string) {
    const data = await this.sedeService.findOne(id);
    return {
      data,
      message: "Sede found",
      state: StatusModel.SUCCESS,
      codeError: HttpStatus.OK,
    };
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a sede" })
  async update(@Param("id") id: string, @Body() updateSedeDto: UpdateSedeDto) {
    const data = await this.sedeService.update(id, updateSedeDto);
    return {
      data,
      message: "Sede updated",
      state: StatusModel.SUCCESS,
      codeError: HttpStatus.OK,
    };
  }

  @Post(":id")
  @ApiOperation({ summary: "Delete a sede" })
  async remove(@Param("id") id: string) {
    const result = await this.sedeService.remove(id);
    if (result.affected && result.affected > 0) {
      return {
        message: "Sede deleted",
        state: StatusModel.SUCCESS,
        codeError: HttpStatus.OK,
      };
    }
  }
}
