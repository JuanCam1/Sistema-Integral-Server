import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  welcome(): string {
    return "Welcome to API Sistema Integral";
  }
}
