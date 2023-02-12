import camelCaseKeys from 'camelcase-keys';
import { MappedPaginatorInfo, PaginatorInfo ,  MappedPaginatorInfos, PaginatorInfos } from '@/types';

export const mapPaginatorData = (
  obj: PaginatorInfos<any> | undefined
): MappedPaginatorInfos | null => {
  
  if (!obj) return null;
  const { data, ...formattedValues } = camelCaseKeys(obj);
  return {
    ...formattedValues,
    hasMorePages: formattedValues.totalpage !== formattedValues.currentpage,
  };
};
