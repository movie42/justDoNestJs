import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  database: 'nestdb',
  port: 5432,
  username: 'admin',
  password: '1234',
  entities: [__dirname + '../**/*.entity.{js,ts}'],
  synchronize: false,
};
