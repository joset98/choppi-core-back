import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Store } from './store.entity';

export interface PaginatedStores {
  data: Store[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  async findAll(page = 1, limit = 10, q?: string): Promise<PaginatedStores> {
    const queryBuilder = this.storeRepository.createQueryBuilder('store')
      .where('store.deletedAt IS NULL')
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('store.createdAt', 'DESC');

    if (q) {
      queryBuilder.andWhere('(store.name ILIKE :q OR store.city ILIKE :q)', { q: `%${q}%` });
    }

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Store> {
    const store = await this.storeRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });

    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }

    return store;
  }

  async create(storeData: Partial<Store>): Promise<Store> {
    const store = this.storeRepository.create(storeData);
    return await this.storeRepository.save(store);
  }

  async update(id: string, storeData: Partial<Store>): Promise<Store> {
    const store = await this.findOne(id);
    Object.assign(store, storeData);
    return await this.storeRepository.save(store);
  }

  async remove(id: string): Promise<void> {
    const store = await this.findOne(id);
    await this.storeRepository.softDelete(id);
  }
}