import { join } from "node:path";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { SwaggerModule } from "@nestjs/swagger";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AreaModule } from "./modules/area/area.module";
import { AuthModule } from "./modules/auth/auth.module";
import { CompanyModule } from "./modules/company/company.module";
import { ConfigModule as ConfigAppModule } from "./modules/config/config.module";
import { DeveloperModule } from "./modules/developer/developer.module";
import { DocumentModule } from "./modules/document/document.module";
import { DocumentReportModule } from "./modules/document-report/document-report.module";
import { ImageModule } from "./modules/image/image.module";
import { ManualModule } from "./modules/manual/manual.module";
import { PeriodicityModule } from "./modules/periodicity/periodicity.module";
import { PlatformModule } from "./modules/platform/platform.module";
import { ReportModule } from "./modules/report/report.module";
import { ReportDeliveryModule } from "./modules/report-delivery/report-delivery.module";
import { ReportHistoryModule } from "./modules/report-history/report-history.module";
import { SedeModule } from "./modules/sede/sede.module";
import { StateModule } from "./modules/state/state.module";
import { TaskModule } from "./modules/task/task.module";
import { UserModule } from "./modules/user/user.module";
import { UserTypeModule } from "./modules/user-type/user-type.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env.local",
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "..", "uploads", "images"),
      serveRoot: "/images",
      serveStaticOptions: {
        index: false,
      },
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
    StateModule,
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
    UserTypeModule,
    SwaggerModule,
    ConfigModule,
    DeveloperModule,
    ConfigAppModule,
    ImageModule,
    TaskModule,
    ManualModule,
    DocumentReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
