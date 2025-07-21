import { Module } from "@nestjs/common";
import { UserTypeService } from "./user-type.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserType } from "./entities/user-type.entity";
import { UserTypeController } from "./user-type.controller";

@Module({
  imports: [TypeOrmModule.forFeature([UserType])],
  controllers: [UserTypeController],
  providers: [UserTypeService],
})
export class UserTypeModule {}
