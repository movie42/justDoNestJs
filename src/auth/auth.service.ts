import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialDto } from "./dto/authCredential.dto";
import { UserRepository } from "./user.repository";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {}
  async signUp(authCredential: AuthCredentialDto) {
    return this.userRepository.createUser(authCredential);
  }

  async signIn(authCredentialDto: AuthCredentialDto) {
    return this.userRepository.findUser(authCredentialDto);
  }
}
