import { Module } from "@nestjs/common";
import { ManualService } from "./manual.service";
import { ManualController } from "./manual.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Manual } from "./entities/manual.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Manual])],
  controllers: [ManualController],
  providers: [ManualService],
})
export class ManualModule {}
