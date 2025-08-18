import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiOperation } from "@nestjs/swagger";
import { Response } from "express";
import { memoryStorage } from "multer";
import { HttpCode } from "src/utils/http-code";
import { sendResponse } from "src/utils/send-response";
import { validateError } from "src/utils/validate-error";
import { StatusModel } from "types/status.model";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

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
      storage: memoryStorage(),
      // storage: diskStorage({
      //   destination: PathConst.destinationImages,
      //   filename: (req, file, cb) => {
      //     const uniqueName = `${Date.now()}-${Math.round(
      //       Math.random() * 1e9,
      //     )}${extname(file.originalname)}`;
      //     cb(null, uniqueName);
      //   },
      // }),
    }),
  )
  async register(
    @UploadedFile() file: Express.Multer.File,
    @Body() registerDto: RegisterDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.authService.register(registerDto, file);
      return sendResponse(
        data,
        "User created",
        StatusModel.SUCCESS,
        res,
        HttpCode.CREATED,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const data = await this.authService.login(loginDto);
      return sendResponse(
        data,
        "User created",
        StatusModel.SUCCESS,
        res,
        HttpCode.CREATED,
      );
    } catch (error) {
      return validateError(error, res);
    }
  }
}
