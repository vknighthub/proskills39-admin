import { crudFactory } from '@/data/client/curd-factory';
import {
  CreateOrderStatusInput,
  OrderStatus,
  OrderStatusPaginator,
  OrderStatusQueryOptions,
  QueryOptions,
} from '@/types';
import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { HttpClient } from '@/data/client/http-client';

export const orderStatusClient = {
  ...crudFactory<OrderStatus, QueryOptions, CreateOrderStatusInput>(
    API_ENDPOINTS.ORDER_STATUS
  ),
  paginated: ({ name, ...params }: Partial<OrderStatusQueryOptions>) => {
    return HttpClient.get<OrderStatusPaginator>(API_ENDPOINTS.ORDER_STATUS, {
      searchJoin: 'and',
      ...params,
      search: HttpClient.formatSearchParams({ name }),
    });
  },
};
