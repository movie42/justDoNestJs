import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthCredentialDto } from "./dto/authCredential.dto";
import { GetUser } from "./getUser.decorator";
import { User } from "./user.entity";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto) {
    return this.authService.signUp(authCredentialDto);
  }

  @Post("/login")
  signIn(@Body(ValidationPipe) authCredentailDto: AuthCredentialDto) {
    return this.authService.signIn(authCredentailDto);
  }

  @Post("/test")
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user);
  }
}
