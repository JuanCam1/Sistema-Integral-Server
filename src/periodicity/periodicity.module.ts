import { Module } from "@nestjs/common";
import { PeriodicityService } from "./periodicity.service";
import { PeriodicityController } from "./periodicity.controller";
import { Periodicity } from "./entities/periodicity.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Periodicity])],
  controllers: [PeriodicityController],
  providers: [PeriodicityService],
})
export class PeriodicityModule {}
