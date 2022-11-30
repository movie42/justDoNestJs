import { CustomRepository } from "src/db/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/authCredential.dto";
import { User } from "./user.entity";

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialDto) {
    const { username, password } = authCredentialDto;
    const user = this.create({ username, password });
    await this.save(user);
    return user;
  }
}
