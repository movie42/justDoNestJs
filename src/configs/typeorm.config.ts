import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "1234",
  database: "nestdb",
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  synchronize: true
};
