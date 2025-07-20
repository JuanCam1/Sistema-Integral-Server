import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PeriodicityService } from "./periodicity.service";
import { CreatePeriodicityDto } from "./dto/create-periodicity.dto";
import { UpdatePeriodicityDto } from "./dto/update-periodicity.dto";

@Controller("periodicity")
export class PeriodicityController {
  constructor(private readonly periodicityService: PeriodicityService) {}

  @Post()
  create(@Body() createPeriodicityDto: CreatePeriodicityDto) {
    return this.periodicityService.create(createPeriodicityDto);
  }

  @Get()
  findAll() {
    return this.periodicityService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.periodicityService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePeriodicityDto: UpdatePeriodicityDto,
  ) {
    return this.periodicityService.update(+id, updatePeriodicityDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.periodicityService.remove(+id);
  }
}
