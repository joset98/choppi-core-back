import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { StoreProduct } from './store-product.entity';
import { Store } from './store.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class StoreProductsService {
  constructor(
    @InjectRepository(StoreProduct)
    private storeProductRepository: Repository<StoreProduct>,
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  async create(storeId: string, createData: { productId: string; price: number; stock: number }): Promise<StoreProduct> {
    const store = await this.storeRepository.findOne({ where: { id: storeId, deletedAt: IsNull() } });
    if (!store) {
      throw new NotFoundException(`Store with ID ${storeId} not found`);
    }

    const product = await this.productRepository.findOne({ where: { id: createData.productId } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${createData.productId} not found`);
    }

    const storeProduct = this.storeProductRepository.create({
      store,
      product,
      price: createData.price,
      stock: createData.stock,
    });

    return await this.storeProductRepository.save(storeProduct);
  }

  async findAll(storeId: string, options: { page?: number; limit?: number; q?: string; inStock?: boolean } = {}): Promise<{ data: StoreProduct[]; total: number; page: number; limit: number; totalPages: number }> {
    const { page = 1, limit = 10, q, inStock } = options;
    const skip = (page - 1) * limit;

    let query = this.storeProductRepository
      .createQueryBuilder('sp')
      .leftJoinAndSelect('sp.product', 'product')
      .leftJoinAndSelect('sp.store', 'store')
      .where('store.id = :storeId', { storeId })
      .andWhere('store.deletedAt IS NULL');

    if (q) {
      query = query.andWhere('product.name ILIKE :q OR product.description ILIKE :q', { q: `%${q}%` });
    }

    if (inStock !== undefined && inStock) {
      query = query.andWhere('sp.stock > 0');
    } else {
      query = query.andWhere('sp.stock = 0');
    }

    query = query.orderBy('sp.createdAt', 'DESC').skip(skip).take(limit);

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(storeId: string, storeProductId: string): Promise<StoreProduct> {
    const storeProduct = await this.storeProductRepository
      .createQueryBuilder('sp')
      .leftJoinAndSelect('sp.product', 'product')
      .leftJoinAndSelect('sp.store', 'store')
      .where('sp.id = :storeProductId', { storeProductId })
      .andWhere('store.id = :storeId', { storeId })
      .andWhere('store.deletedAt IS NULL')
      .getOne();

    if (!storeProduct) {
      throw new NotFoundException(`Store product with ID ${storeProductId} not found in store ${storeId}`);
    }

    return storeProduct;
  }

  async update(storeId: string, storeProductId: string, updateData: { price?: number; stock?: number }): Promise<StoreProduct> {
    const storeProduct = await this.findOne(storeId, storeProductId);

    if (updateData.price !== undefined) {
      storeProduct.price = updateData.price;
    }

    if (updateData.stock !== undefined) {
      storeProduct.stock = updateData.stock;
    }

    return await this.storeProductRepository.save(storeProduct);
  }

  async remove(storeId: string, storeProductId: string): Promise<void> {
    const storeProduct = await this.findOne(storeId, storeProductId);
    await this.storeProductRepository.remove(storeProduct);
  }
}