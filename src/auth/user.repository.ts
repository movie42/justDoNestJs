import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException
} from "@nestjs/common";
import { CustomRepository } from "src/db/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/authCredential.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcryptjs";

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialDto) {
    const { username, password } = authCredentialDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("Esistin username");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findUser(authCredentialDto: AuthCredentialDto) {
    try {
      const { username, password } = authCredentialDto;
      console.log(username, password);
      const user = await this.findOne({ where: { username } });
      console.log(user);
      if (user && (await bcrypt.compare(password, user.password))) {
        return user.username;
      }
      throw new UnauthorizedException("Login Failed");
    } catch (error) {
      console.log(error);
    }
  }
}
