import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import {
  DisapproveShop,
  FollowShopController,
  ShopsController,
  StaffsController,
  TopShopsController,
  FollowedShops,
} from './shops.controller';

@Module({
  controllers: [
    ShopsController,
    StaffsController,
    TopShopsController,
    DisapproveShop,
    FollowShopController,
    FollowedShops,
  ],
  providers: [ShopsService],
})
export class ShopsModule {}
