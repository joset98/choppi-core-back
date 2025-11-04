import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { StoreProduct } from '../stores/store-product.entity';
import { Product } from 'src/products/product.entity';
import { Store } from 'src/stores/store.entity';

export class StoreProductsSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const storeProductRepository = dataSource.getRepository(StoreProduct);
    const storeRepository = dataSource.getRepository(Store);
    const productRepository = dataSource.getRepository(Product);
    const storeList = await storeRepository.find()
    const productList = await productRepository.find();

    const storeProducts = [
      // Supermercado Central (store-001)
      { store: storeList[0], product: productList[0], price: 2.50, stock: 45 },
      { store: storeList[0], product: productList[1], price: 1.20, stock: 30 },
      { store: storeList[0], product: productList[2], price: 3.00, stock: 25 },
      { store: storeList[0], product: productList[3], price: 5.50, stock: 20 },
      { store: storeList[0], product: productList[4], price: 2.80, stock: 35 },
      { store: storeList[0], product: productList[5], price: 8.90, stock: 15 },
      { store: storeList[0], product: productList[6], price: 2.20, stock: 40 },
      { store: storeList[0], product: productList[7], price: 1.80, stock: 28 },
      { store: storeList[0], product: productList[8], price: 1.50, stock: 50 },
      { store: storeList[0], product: productList[9], price: 6.50, stock: 18 },
      { store: storeList[0], product: productList[10], price: 3.20, stock: 22 },
      { store: storeList[0], product: productList[11], price: 4.80, stock: 16 },
      { store: storeList[0], product: productList[12], price: 2.10, stock: 42 },
      { store: storeList[0], product: productList[13], price: 3.40, stock: 24 },
      { store: storeList[0], product: productList[14], price: 1.80, stock: 38 },

      // Tienda de la Esquina (store-002)
      { store: storeList[1], product: productList[0], price: 2.60, stock: 12 },
      { store: storeList[1], product: productList[1], price: 1.10, stock: 8 },
      { store: storeList[1], product: productList[2], price: 2.80, stock: 15 },
      { store: storeList[1], product: productList[5], price: 9.20, stock: 6 },
      { store: storeList[1], product: productList[6], price: 2.00, stock: 20 },
      { store: storeList[1], product: productList[10], price: 3.10, stock: 10 },
      { store: storeList[1], product: productList[14], price: 1.60, stock: 25 },
      { store: storeList[1], product: productList[15], price: 2.50, stock: 14 },
      { store: storeList[1], product: productList[16], price: 3.80, stock: 7 },
      { store: storeList[1], product: productList[17], price: 1.90, stock: 18 },

      // Mercado Orgánico (store-003)
      { store: storeList[2], product: productList[6], price: 2.80, stock: 25 },
      { store: storeList[2], product: productList[2], price: 3.50, stock: 30 },
      { store: storeList[2], product: productList[7], price: 2.20, stock: 20 },
      { store: storeList[2], product: productList[9], price: 7.50, stock: 12 },
      { store: storeList[2], product: productList[14], price: 2.20, stock: 35 },
      { store: storeList[2], product: productList[15], price: 2.80, stock: 16 },
      { store: storeList[2], product: productList[16], price: 4.20, stock: 8 },
      { store: storeList[2], product: productList[17], price: 2.10, stock: 22 },
      { store: storeList[2], product: productList[18], price: 4.50, stock: 10 },
      { store: storeList[2], product: productList[10], price: 2.80, stock: 15 },
    ];

    await storeProductRepository.save(storeProducts);
  }
}