import { DataSource } from 'typeorm';
import { runSeeders, Seeder } from 'typeorm-extension';
import { ProductsSeeder } from './products.seeder';
import { StoresSeeder } from './stores.seeder';
import { StoreProductsSeeder } from './store-products.seeder';
import { UsersSeeder } from './users.seeder';

export class CreateSeeds implements Seeder {
  async run(
    dataSource: DataSource,
  ): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [UsersSeeder, ProductsSeeder, StoresSeeder, StoreProductsSeeder],
      factories: [],
    });
  }
}
