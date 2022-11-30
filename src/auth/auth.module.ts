import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmExModule } from "src/db/typeorm-ex.module";
import { UserRepository } from "./user.repository";

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
