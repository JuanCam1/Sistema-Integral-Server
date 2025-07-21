import { Controller, Get } from "@nestjs/common";
import { StateService } from "./state.service";
import { ApiOperation } from "@nestjs/swagger";

@Controller("state")
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  @ApiOperation({ summary: "Get all states" })
  async findAll() {
    return await this.stateService.findAll();
  }
}
