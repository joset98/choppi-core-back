import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreProduct } from '../stores/store-product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(StoreProduct)
    private storeProductRepository: Repository<StoreProduct>,
  ) {}

  async calculateQuote(items: { storeProductId: string; quantity: number }[]): Promise<{ subtotal: number; items: Array<{ storeProductId: string; quantity: number; price: number; subtotal: number; product: { id: string; name: string; category: string; }; store: { id: string; name: string; } }> }> {
    if (!Array.isArray(items) || items.length === 0) {
      throw new BadRequestException('Cart items cannot be empty');
    }

    let subtotal = 0;
    const quoteItems: Array<{ storeProductId: string; quantity: number; price: number; subtotal: number; product: { id: string; name: string; category: string; }; store: { id: string; name: string; } }> = [];

    for (const item of items) {
      if (!item.storeProductId || typeof item.quantity !== 'number' || item.quantity <= 0) {
        throw new BadRequestException('Invalid cart item: storeProductId and quantity > 0 are required');
      }

      const storeProduct = await this.storeProductRepository.findOne({
        where: { id: item.storeProductId },
        relations: ['product', 'store'],
      });

      if (!storeProduct) {
        throw new NotFoundException(`Store product with ID ${item.storeProductId} not found`);
      }

      const itemSubtotal = storeProduct.price * item.quantity;
      subtotal += itemSubtotal;

      quoteItems.push({
        storeProductId: item.storeProductId,
        quantity: item.quantity,
        price: storeProduct.price,
        subtotal: itemSubtotal,
        product: {
          id: storeProduct.product.id,
          name: storeProduct.product.name,
          category: storeProduct.product.category,
        },
        store: {
          id: storeProduct.store.id,
          name: storeProduct.store.name,
        },
      });
    }

    return {
      subtotal: Math.round(subtotal * 100) / 100, // Round to 2 decimal places
      items: quoteItems,
    };
  }
}