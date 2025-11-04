import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from "@nestjs/config";
import { CHOPPI_DATABASE_CONFIGURATION } from "./config/databases.config";

registerAs('typeorm', () => CHOPPI_DATABASE_CONFIGURATION)
const ChoppiDataSource = new DataSource(CHOPPI_DATABASE_CONFIGURATION as DataSourceOptions);

export default ChoppiDataSource;
