import { Module } from "@nestjs/common";
import { CompanyPlatformService } from "./company-platform.service";
import { CompanyPlatformController } from "./company-platform.controller";
import { CompanyPlatform } from "./entities/company-platform.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([CompanyPlatform])],
  controllers: [CompanyPlatformController],
  providers: [CompanyPlatformService],
})
export class CompanyPlatformModule {}
