import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ProductsController,
  PopularProductsController,
  FollowedShopsProductsController,
} from './products.controller';

@Module({
  controllers: [ProductsController, PopularProductsController, FollowedShopsProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
