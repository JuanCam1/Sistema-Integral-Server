import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcryptjs from "bcryptjs";

import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { UserService } from "src/user/user.service";
import { capitalizeText } from "src/utils/capitalize-text";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.userService.findOneByEmail(registerDto.email);

    if (user) {
      throw new BadRequestException("Email already exists");
    }

    const hashedPassword = await bcryptjs.hash(registerDto.password, 10);
    const nameCapitalized = capitalizeText(registerDto.name);
    const lastnameCapitalized = capitalizeText(registerDto.lastname);

    await this.userService.create({
      name: nameCapitalized,
      email: registerDto.email,
      password: hashedPassword,
      profile: registerDto.profile,
      userTypeId: registerDto.userTypeId,
      areaId: registerDto.areaId,
      imageId: registerDto.imageId,
      stateId: registerDto.stateId,
      cedula: registerDto.cedula,
      lastname: lastnameCapitalized,
      phone: registerDto.phone,
    });

    return {
      message: "User created successfully",
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Invalid email");
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password");
    }

    const payload = { email: user.email };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email: user.email,
    };
  }
}
