import { ConfigService } from "@nestjs/config";
import { SeederOptions } from 'typeorm-extension';
import { TypeOrmModuleOptions } from "@nestjs/typeorm";


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
  ssl: CONFIGURATION_SERVICE.get('SUPABASE_DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
  autoLoadEntities: true,
  synchronize: CONFIGURATION_SERVICE.getOrThrow('POSTGRES_BMA_SYNCHRONIZE') == 'true',
  entities: ["src/**/*.entity.ts"],
  migrations: ["dist/migrations/**.js"],
  seeds: ['dist/seeds/**.js'],
  seedTracking: false
};

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions & SeederOptions => ({
  type: 'postgres',
  name: configService.getOrThrow('POSTGRES_NAME'),
  host: configService.getOrThrow('POSTGRES_HOST'),
  port: parseInt(configService.getOrThrow('POSTGRES_PORT'), 10),
  database: configService.getOrThrow('POSTGRES_DB'),
  username: configService.getOrThrow('POSTGRES_USER'),
  password: configService.getOrThrow('POSTGRES_PASSWORD'),
  schema: configService.get('API_SCHEMA_DB') || undefined,
  
  ssl: configService.get('SUPABASE_DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
  autoLoadEntities: true,
  synchronize: configService.getOrThrow('POSTGRES_BMA_SYNCHRONIZE') === 'true', 
  
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
  seeds: [__dirname + '/../seeds/*.{ts,js}'],
  seedTracking: false
});
