import {
    Product,
    CreateProduct,
    QueryOptions,
    GetParams,
    ProductQueryOptions,
    BaseReponse,
    Challenge
  } from '@/types';
  import { API_ENDPOINTS } from './api-endpoints';
  import { crudFactory } from './curd-factory';
  import { HttpClient } from './http-client';
  
  export const challegerClient = {
    ...crudFactory<Challenge, QueryOptions, CreateProduct>(API_ENDPOINTS.CHALLEGE),
    get({ slug, language }: GetParams) {
      return HttpClient.get<Challenge>(`${API_ENDPOINTS.CHALLEGE}/${slug}`, {
        language,
        with: 'type;shop;categories;tags;variations.attribute.values;variation_options;author;manufacturer;digital_file',
      });
    },
    paginated: ({
      type,
      name,
      categories,
      shop_id,
      ...params
    }: Partial<ProductQueryOptions>) => {
      return HttpClient.get<BaseReponse<Challenge>>(API_ENDPOINTS.CHALLEGE, {
        searchJoin: 'and',
        with: 'shop;type',
        ...params,
        search: HttpClient.formatSearchParams({
          type,
          name,
          categories,
          shop_id,
        }),
      });
    },
    popular({ shop_id, ...params }: Partial<ProductQueryOptions>) {
      return HttpClient.get<Product[]>(API_ENDPOINTS.POPULAR_PRODUCTS, {
        searchJoin: 'and',
        with: 'type;shop',
        ...params,
        search: HttpClient.formatSearchParams({ shop_id }),
      });
    },
  };
  