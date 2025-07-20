import { Module } from '@nestjs/common';
import { PeriodicityService } from './periodicity.service';
import { PeriodicityController } from './periodicity.controller';

@Module({
  controllers: [PeriodicityController],
  providers: [PeriodicityService],
})
export class PeriodicityModule {}
