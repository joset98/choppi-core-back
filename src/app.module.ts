import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StoresModule } from './stores/stores.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // Change to your PostgreSQL username
      password: 'password', // Change to your PostgreSQL password
      database: 'choppi_api', // Change to your database name
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Don't use in production - use migrations instead
    }),
    AuthModule,
    StoresModule,
    ProductsModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
