import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { PathConst } from "src/consts/paths-const";
import { extname } from "node:path";
import { ApiBody, ApiConsumes, ApiOperation } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Register user" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        cedula: { type: "string" },
        name: { type: "string" },
        lastname: { type: "string" },
        phone: { type: "string" },
        email: { type: "string", format: "email" },
        password: { type: "string" },
        profile: { type: "string" },
        userTypeId: { type: "string" },
        areaId: { type: "string" },
        stateId: { type: "integer" },
        image: { type: "string", format: "binary" },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor("image", {
      limits: { files: 1 },
      storage: diskStorage({
        destination: PathConst.destinationImages,
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9,
          )}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  register(
    @UploadedFile() file: Express.Multer.File,
    @Body() registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto, file);
  }

  @Post("login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
