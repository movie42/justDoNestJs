import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { BoardRepository } from "./boards/board.repository";
import { BoardsModule } from "./boards/boards.module";
import { typeORMConfig } from "./configs/typeorm.config";
import { TypeOrmExModule } from "./db/typeorm-ex.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    TypeOrmExModule.forCustomRepository([BoardRepository]),
    BoardsModule,
    AuthModule
  ]
})
export class AppModule {}
