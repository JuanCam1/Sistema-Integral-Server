import { Module } from "@nestjs/common";
import { DeveloperService } from "./developer.service";
import { DeveloperController } from "./developer.controller";
import { Developer } from "./entities/developer.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Developer])],
  controllers: [DeveloperController],
  providers: [DeveloperService],
})
export class DeveloperModule {}
