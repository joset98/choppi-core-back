import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { StoreProduct } from '../stores/store-product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(StoreProduct)
    private storeProductRepository: Repository<StoreProduct>,
  ) { }

  async findAll(options: { page?: number; limit?: number; q?: string; category?: string } = {}): Promise<{ data: Product[]; total: number; page: number; limit: number; totalPages: number }> {
    const { page = 1, limit = 10, q, category } = options;
    const skip = (page - 1) * limit;

    let query = this.productRepository
      .createQueryBuilder('product')
      .where('product.isActive = :isActive', { isActive: true });

    if (q) {
      query = query.andWhere('product.name ILIKE :q OR product.description ILIKE :q', { q: `%${q}%` });
    }

    if (category) {
      query = query.andWhere('product.category ILIKE :category', { category: `%${category}%` });
    }

    query = query.orderBy('product.createdAt', 'DESC').skip(skip).take(limit);

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Product & { stores: any[] }> {
    const product = await this.productRepository.findOne({
      where: { id, isActive: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Get all stores where this product is available
    const storeProducts = await this.storeProductRepository.find({
      where: { product: { id } },
      relations: ['store'],
    });

    const stores = storeProducts.map(sp => ({
      id: sp.id,
      price: sp.price,
      stock: sp.stock,
      inStock: sp.stock > 0,
      store: {
        id: sp.store.id,
        city: sp.store.city,
        name: sp.store.name,
      }
    }));

    return {
      ...product,
      stores,
    };
  }

  async create(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(productData);
    return await this.productRepository.save(product);
  }

  async update(id: string, productData: Partial<Product>): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id, isActive: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    Object.assign(product, productData);
    return await this.productRepository.save(product);
  }
}