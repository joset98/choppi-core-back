import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CartService } from './cart.service';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('quote')
  @ApiOperation({ summary: 'Calculate cart quote' })
  @ApiBody({
    description: 'Array of cart items with storeProductId and quantity',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          storeProductId: { type: 'string', description: 'Store product ID' },
          quantity: { type: 'number', description: 'Quantity of the product' },
        },
        required: ['storeProductId', 'quantity'],
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Cart quote with subtotal' })
  @ApiResponse({ status: 400, description: 'Invalid cart items' })
  async quote(@Body() items: { storeProductId: string; quantity: number }[]): Promise<{ subtotal: number; items: Array<{ storeProductId: string; quantity: number; price: number; subtotal: number; product: { id: string; name: string; category: string; }; store: { id: string; name: string; } }> }> {
    return this.cartService.calculateQuote(items);
  }
}