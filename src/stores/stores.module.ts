import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './store.entity';
import { StoreService } from './store.service';
import { StoresController } from './stores.controller';
import { StoreProduct } from './store-product.entity';
import { StoreProductsService } from './store-products.service';
import { Product } from '../products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store, StoreProduct, Product])],
  controllers: [StoresController],
  providers: [StoreService, StoreProductsService],
  exports: [StoreService, StoreProductsService],
})

export class StoresModule {}
