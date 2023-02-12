import {
  Product,
  CreateProduct,
  QueryOptions,
  GetParams,
  ProductQueryOptions,
  BaseReponse,
  Proposal
} from '@/types';
import { API_ENDPOINTS } from './api-endpoints';
import { crudFactory } from './curd-factory';
import { HttpClient } from './http-client';

export const ProposalClient = {
  ...crudFactory<Proposal, QueryOptions, CreateProduct>(API_ENDPOINTS.PROPOSAL),
  get({ slug, language }: GetParams) {
    return HttpClient.get<Proposal>(`${API_ENDPOINTS.PROPOSAL}/${slug}`, {
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
    return HttpClient.get<BaseReponse<Proposal>>(API_ENDPOINTS.PROPOSAL, {
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
