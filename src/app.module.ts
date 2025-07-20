import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AreaModule } from "./area/area.module";
import { CompanyModule } from "./company/company.module";
import { PeriodicityModule } from "./periodicity/periodicity.module";
import { PlatformModule } from "./platform/platform.module";
import { SedeModule } from "./sede/sede.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ReportModule } from "./report/report.module";
import { DocumentModule } from "./document/document.module";
import { ReportDeliveryModule } from "./report-delivery/report-delivery.module";
import { ReportHistoryModule } from "./report-history/report-history.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env.local",
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get("DATABASE_HOST"),
        port: configService.get("DATABASE_PORT"),
        username: configService.get("USERNAME_DB"),
        password: configService.get("PASSWORD_DB"),
        database: configService.get("DATABASE"),
        retryDelay: 3000,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AreaModule,
    CompanyModule,
    PeriodicityModule,
    PlatformModule,
    SedeModule,
    UserModule,
    AuthModule,
    ReportModule,
    DocumentModule,
    ReportDeliveryModule,
    ReportHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
