import Router, { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { ProposalClient } from './client/proposal';
import {
  ProductQueryOptions,
  Proposal,
  BaseReponse,
} from '@/types';
import { mapPaginatorData } from '@/utils/data-mappers';
import { Routes } from '@/config/routes';
import { Config } from '@/config';

// export const useCreateProductMutation = () => {
//   const queryClient = useQueryClient();
//   const router = useRouter();
//   const { t } = useTranslation();
//   return useMutation(challegerClient.create, {
//     onSuccess: async () => {
//       const generateRedirectUrl = router.query.shop
//         ? `/${router.query.shop}${Routes.product.list}`
//         : Routes.product.list;
//       await Router.push(generateRedirectUrl, undefined, {
//         locale: Config.defaultLanguage,
//       });
//       toast.success(t('common:successfully-created'));
//     },
//     // Always refetch after error or success:
//     onSettled: () => {
//       queryClient.invalidateQueries(API_ENDPOINTS.CHALLEGE);
//     },
//   });
// };

// export const useUpdateProductMutation = () => {
//   const { t } = useTranslation();
//   const queryClient = useQueryClient();
//   const router = useRouter();
//   return useMutation(challegerClient.update, {
//     onSuccess: async (data) => {
//       const generateRedirectUrl = router.query.shop
//         ? `/${router.query.shop}${Routes.product.list}`
//         : Routes.product.list;
//       await router.push(`${generateRedirectUrl}/${data}/edit`, undefined, {
//         locale: Config.defaultLanguage,
//       });
//       toast.success(t('common:successfully-updated'));
//     },
//     // Always refetch after error or success:
//     onSettled: () => {
//       queryClient.invalidateQueries(API_ENDPOINTS.CHALLEGE);
//     },
//   });
// };

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(ProposalClient.delete, {
    onSuccess: () => {
      toast.success(t('common:successfully-deleted'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.CHALLEGE);
    },
  });
};

// export const useProductQuery = ({ slug, language }: GetParams) => {
//   const { data, error, isLoading } = useQuery<Product, Error>(
//     [API_ENDPOINTS.FUND, { slug, language }],
//     () => productClient.get({ slug, language })
//   );

//   return {
//     product: data,
//     error,
//     isLoading,
//   };
// };

export const useProposalQuery = (
  params: Partial<ProductQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<BaseReponse<Proposal>, Error>(
    
    [API_ENDPOINTS.PROPOSAL, params],
    ({ queryKey, pageParam }) =>
    ProposalClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
      ...options,
    }
  );
 
  return {
    products: data?.result?.data  ,
    paginatorInfo: mapPaginatorData(data?.result?.data),
    error,
    loading: isLoading,
  };
};
