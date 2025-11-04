import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StoreService, PaginatedStores } from './store.service';
import { Store } from './store.entity';
import { StoreProductsService } from './store-products.service';
import { StoreProduct } from './store-product.entity';

@ApiTags('stores')
@Controller('stores')
export class StoresController {
  constructor(
    private readonly storeService: StoreService,
    private readonly storeProductsService: StoreProductsService,
  ) {}

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('q') q?: string,
    @Query('search') search?: string,
  ): Promise<PaginatedStores> {
    return this.storeService.findAll(parseInt(page, 10), parseInt(limit, 10), q || search);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Store> {
    return this.storeService.findOne(id);
  }

  @Post()
  async create(@Body() storeData: Partial<Store>): Promise<Store> {
    return this.storeService.create(storeData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() storeData: Partial<Store>,
  ): Promise<Store> {
    return this.storeService.update(id, storeData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.storeService.remove(id);
  }

  // StoreProducts endpoints
  @Post(':id/products')
  async addProduct(
    @Param('id') storeId: string,
    @Body() createData: { productId: string; price: number; stock: number },
  ): Promise<StoreProduct> {
    return this.storeProductsService.create(storeId, createData);
  }

  @Get(':id/products')
  async getProducts(
    @Param('id') storeId: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('q') q?: string,
    @Query('inStock') inStock?: string,
  ): Promise<{ data: StoreProduct[]; total: number }> {
    return this.storeProductsService.findAll(storeId, {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      q,
      inStock: inStock === 'true' ? true : inStock === 'false' ? false : undefined,
    });
  }

  @Put(':id/products/:storeProductId')
  async updateProduct(
    @Param('id') storeId: string,
    @Param('storeProductId') storeProductId: string,
    @Body() updateData: { price?: number; stock?: number },
  ): Promise<StoreProduct> {
    return this.storeProductsService.update(storeId, storeProductId, updateData);
  }

  @Delete(':id/products/:storeProductId')
  async removeProduct(
    @Param('id') storeId: string,
    @Param('storeProductId') storeProductId: string,
  ): Promise<void> {
    return this.storeProductsService.remove(storeId, storeProductId);
  }
}