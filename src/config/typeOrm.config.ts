import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export function typeOrmConfig(): TypeOrmModuleOptions {
  return {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "aliapi",
    database: "nest-auth",
    entities: [
      "dist/**/**/**/*.entity{.ts,.js}",
      "dist/**/**/*.entity{.ts,.js}",
    ],
    synchronize: true,
    autoLoadEntities: true,
  };
}
