import { Controller, Get, HttpStatus } from "@nestjs/common";
import { StateService } from "./state.service";
import { ApiOperation } from "@nestjs/swagger";

@Controller("state")
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  @ApiOperation({ summary: "Get all states" })
  async findAll() {
    const data = await this.stateService.findAll();
    return { data, message: "OK", state: "SUCCESS", codeError: HttpStatus.OK };
  }
}
