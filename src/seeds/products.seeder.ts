import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Product } from '../products/product.entity';

export class ProductsSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const productRepository = dataSource.getRepository(Product);

    const products = [
      {
        name: 'Leche Entera',
        description: 'Leche fresca pasteurizada',
        price: 2.50,
        category: 'Lácteos',
        isActive: true,
      },
      {
        name: 'Pan Integral',
        description: 'Pan de trigo integral',
        price: 1.20,
        category: 'Panadería',
        isActive: true,
      },
      {
        name: 'Manzanas Rojas',
        description: 'Manzanas rojas frescas',
        price: 3.00,
        category: 'Frutas',
        isActive: true,
      },
      {
        name: 'Queso Cheddar',
        description: 'Queso cheddar madurado',
        price: 5.50,
        category: 'Lácteos',
        isActive: true,
      },
      {
        name: 'Arroz Blanco',
        description: 'Arroz blanco de grano largo',
        price: 2.80,
        category: 'Granos',
        isActive: true,
      },
      {
        name: 'Pollo Fresco',
        description: 'Pechuga de pollo sin hueso',
        price: 8.90,
        category: 'Carnes',
        isActive: true,
      },
      {
        name: 'Tomates',
        description: 'Tomates rojos frescos',
        price: 2.20,
        category: 'Verduras',
        isActive: true,
      },
      {
        name: 'Yogur Natural',
        description: 'Yogur natural sin azúcar',
        price: 1.80,
        category: 'Lácteos',
        isActive: true,
      },
      {
        name: 'Pasta Espagueti',
        description: 'Pasta para espagueti',
        price: 1.50,
        category: 'Pastas',
        isActive: true,
      },
      {
        name: 'Aceite de Oliva',
        description: 'Aceite de oliva extra virgen',
        price: 6.50,
        category: 'Aceites',
        isActive: true,
      },
      {
        name: 'Huevos',
        description: 'Docena de huevos frescos',
        price: 3.20,
        category: 'Huevos',
        isActive: true,
      },
      {
        name: 'Café Molido',
        description: 'Café colombiano molido',
        price: 4.80,
        category: 'Café',
        isActive: true,
      },
      {
        name: 'Azúcar Refinada',
        description: 'Azúcar blanca refinada',
        price: 2.10,
        category: 'Endulzantes',
        isActive: true,
      },
      {
        name: 'Atún en Lata',
        description: 'Atún en agua',
        price: 3.40,
        category: 'Enlatados',
        isActive: true,
      },
      {
        name: 'Plátanos',
        description: 'Plátanos maduros',
        price: 1.80,
        category: 'Frutas',
        isActive: true,
      },
      {
        name: 'Harina de Trigo',
        description: 'Harina de trigo todo uso',
        price: 2.30,
        category: 'Harinas',
        isActive: true,
      },
      {
        name: 'Mantequilla',
        description: 'Mantequilla con sal',
        price: 3.60,
        category: 'Lácteos',
        isActive: true,
      },
      {
        name: 'Cebolla',
        description: 'Cebolla blanca fresca',
        price: 1.70,
        category: 'Verduras',
        isActive: true,
      },
      {
        name: 'Jabón en Polvo',
        description: 'Detergente para ropa',
        price: 4.20,
        category: 'Limpieza',
        isActive: true,
      },
      {
        name: 'Galletas María',
        description: 'Galletas dulces',
        price: 2.40,
        category: 'Galletas',
        isActive: true,
      },
    ];

    await productRepository.save(products);
  }
}