import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserType } from "./entities/user-type.entity";

@Injectable()
export class UserTypeService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(UserType)
    private readonly userTypeRepository: Repository<UserType>,
  ) {}

  async onApplicationBootstrap() {
    const defaultUserType = [
      "Administrador",
      "Usuario",
      "Director",
      "Supervisor",
    ];

    for (const state of defaultUserType) {
      const exists = await this.userTypeRepository.findOne({
        where: { name: state },
      });
      if (!exists) {
        await this.userTypeRepository.save({ name: state });
      }
    }
  }

  async findAll() {
    return await this.userTypeRepository.find();
  }
}
