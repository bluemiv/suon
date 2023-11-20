import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'secondhand-trade-db',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
