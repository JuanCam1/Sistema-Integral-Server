import { Injectable } from '@nestjs/common';
import { CreatePeriodicityDto } from './dto/create-periodicity.dto';
import { UpdatePeriodicityDto } from './dto/update-periodicity.dto';

@Injectable()
export class PeriodicityService {
  create(createPeriodicityDto: CreatePeriodicityDto) {
    return 'This action adds a new periodicity';
  }

  findAll() {
    return `This action returns all periodicity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} periodicity`;
  }

  update(id: number, updatePeriodicityDto: UpdatePeriodicityDto) {
    return `This action updates a #${id} periodicity`;
  }

  remove(id: number) {
    return `This action removes a #${id} periodicity`;
  }
}
