import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { AuthCredentialDto } from "./dto/authCredential.dto";
import { UserRepository } from "./user.repository";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}
  async signUp(authCredential: AuthCredentialDto) {
    return await this.userRepository.createUser(authCredential);
  }

  async signIn(authCredentialDto: AuthCredentialDto) {
    try {
      const username = await this.userRepository.findUser(authCredentialDto);
      const payload = { username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } catch (error) {
      throw new NotFoundException("can not found user");
    }
  }
}
