import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto, ProductPaginator } from './dto/get-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { paginate } from 'src/common/pagination/paginate';
import productsJson from '@db/products.json';
import Fuse from 'fuse.js';
import { GetPopularProductsDto } from './dto/get-popular-products.dto';
import { GetFollowedShopsProducts } from './dto/get-followed-shops-products.dto';

const products = plainToClass(Product, productsJson);

const options = {
  keys: [
    'name',
    'type.slug',
    'categories.slug',
    'status',
    'shop_id',
    'price',
    'author.slug',
    'tags.slug',
    'manufacturer.slug',
  ],
  threshold: 0.3,
};
const fuse = new Fuse(products, options);

@Injectable()
export class ProductsService {
  private products: any = products;

  create(createProductDto: CreateProductDto) {
    return this.products[0];
  }

  getProducts({ limit, page, search }: GetProductsDto): ProductPaginator {
    if (!page) page = 1;
    if (!limit) limit = 15;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: Product[] = this.products;
    if (search) {
      const parseSearchParams = search.split(';');
      const searchText: any = [];
      let priceFilter;
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // For price
        if (key === 'price') priceFilter = value;
        if (key !== 'slug' && key !== 'price') {
          searchText.push({
            [key]: value,
          });
        }
      }

      data = fuse
        .search({
          $and: searchText,
        })
        ?.map(({ item }) => item);

      // Filter data throw price
      if (priceFilter) {
        const splitPrice = priceFilter.split(',');
        let min = 0;
        let max = 0;
        if (splitPrice.length === 2) {
          [min, max] = splitPrice;
        } else {
          max = splitPrice[0];
        }

        data = data.filter(
          (singleProduct) =>
            singleProduct.sale_price !== null &&
            singleProduct.sale_price >= min &&
            singleProduct.sale_price <= max,
        );
      }
    }

    const results = data.slice(startIndex, endIndex);
    const url = `/products?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  getProductBySlug(slug: string): Product {
    const product = this.products.find((p) => p.slug === slug);
    // const related_products = this.products
    //   .filter((p) => p.type.slug === product.type.slug)
    //   .slice(0, 20);
    return {
      ...product,
      // related_products,
    };
  }

  getPopularProducts({ limit, type_slug }: GetPopularProductsDto): Product[] {
    let data: any = this.products;
    if (type_slug) {
      data = fuse.search(type_slug)?.map(({ item }) => item);
    }
    return data?.slice(0, limit);
  }

  followedShopsPopularProducts({ limit, language }: GetFollowedShopsProducts): Product[] {
    let data: any = this.products;
    return data?.slice(0, limit);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.products[0];
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
