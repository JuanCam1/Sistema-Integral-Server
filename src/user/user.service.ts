import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { StateModel } from "types/state.model";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find({
      where: {
        state: {
          name: StateModel.ACTIVE,
        },
        isDeleted: false,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.findByUser(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findByUser(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const user = await this.findByUser(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return await this.userRepository.update(id, {
      isDeleted: true,
    });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  private async findByUser(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    return user;
  }
}
