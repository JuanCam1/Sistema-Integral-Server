import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { State } from "./entities/state.entity";
import { Repository } from "typeorm";

@Injectable()
export class StateService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
  ) {}

  async onApplicationBootstrap() {
    const defaultState = ["Activo", "Inactivo", "Pendiente", "Cancelado"];

    for (const state of defaultState) {
      const exists = await this.stateRepository.findOne({
        where: { name: state },
      });
      if (!exists) {
        await this.stateRepository.save({ name: state });
      }
    }
  }

  async findAll() {
    return await this.stateRepository.find({
      order: { id: "ASC" },
    });
  }
}
