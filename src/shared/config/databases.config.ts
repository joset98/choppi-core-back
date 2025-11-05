import { config } from "dotenv";
import { ConfigService } from "@nestjs/config";
import { SeederOptions } from 'typeorm-extension';
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

config();

export const CONFIGURATION_SERVICE: ConfigService = new ConfigService();

export const CHOPPI_DATABASE_CONFIGURATION: TypeOrmModuleOptions & SeederOptions = {
  type: 'postgres',
  name: CONFIGURATION_SERVICE.getOrThrow('POSTGRES_NAME'),
  host: CONFIGURATION_SERVICE.getOrThrow('POSTGRES_HOST'),
  port: CONFIGURATION_SERVICE.getOrThrow('POSTGRES_PORT'),
  database: CONFIGURATION_SERVICE.getOrThrow('POSTGRES_DB'),
  username: CONFIGURATION_SERVICE.getOrThrow('POSTGRES_USER'),
  password: CONFIGURATION_SERVICE.getOrThrow('POSTGRES_PASSWORD'),
  schema: (CONFIGURATION_SERVICE.get('API_SCHEMA_DB') && CONFIGURATION_SERVICE.get('API_SCHEMA_DB') != '') ? CONFIGURATION_SERVICE.get('API_SCHEMA_DB') : undefined,
  ssl: CONFIGURATION_SERVICE.get<boolean>('SUPABASE_DB_SSL') ? { rejectUnauthorized: false } : false,
  autoLoadEntities: true,
  synchronize: CONFIGURATION_SERVICE.getOrThrow('POSTGRES_BMA_SYNCHRONIZE') == 'true',
  entities: ["src/**/*.entity.ts"],
  migrations: ["dist/migrations/**.js"],
  seeds: ['dist/seeds/**.js'],
  seedTracking: false
};
