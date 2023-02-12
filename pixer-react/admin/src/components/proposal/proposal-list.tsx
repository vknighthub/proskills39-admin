import Pagination from '@/components/ui/pagination';
import Image from 'next/image';
import { Table } from '@/components/ui/table';
import { siteSettings } from '@/settings/site.settings';
import usePrice from '@/utils/use-price';
import Badge from '@/components/ui/badge/badge';
import { Router, useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import {
  Proposal,
  MappedPaginatorInfo,
  SortOrder,
  MappedPaginatorInfos,
} from '@/types';
import { useIsRTL } from '@/utils/locals';
import { useState } from 'react';
import TitleWithSort from '@/components/ui/title-with-sort';

export type IProps = {
  products: Proposal | undefined;
  paginatorInfo: MappedPaginatorInfos | null;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};

type SortingObjType = {
  sort: SortOrder;
  column: string | null;
};

const ProductList = ({
  products,
  paginatorInfo,
  onPagination,
  onSort,
  onOrder,
}: IProps) => {
  // const { data, paginatorInfo } = products! ?? {};
  const router = useRouter();
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();

  const [sortingObj, setSortingObj] = useState<SortingObjType>({
    sort: SortOrder.Desc,
    column: null,
  });

  const onHeaderClick = (column: string | null) => ({
    onClick: () => {
      onSort((currentSortDirection: SortOrder) =>
        currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
      );
      onOrder(column!);

      setSortingObj({
        sort:
          sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        column: column,
      });
    },
  });

  let columns = [
    {
      title: t('table:table-proposal-id'),
      dataIndex: 'proposalId',
      key: 'proposalId',
      align: alignLeft,
      width: 74,
      render: (type: any) => {
        return <span className="truncate whitespace-nowrap">{type}</span>;
      },
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-proposal-name')}
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'proposalName'
          }
          isActive={sortingObj.column === 'proposalName'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'proposalName',
      key: 'proposalName',
      align: alignLeft,
      width: 300,
      ellipsis: true,
      onHeaderCell: () => onHeaderClick('proposalName'),
    },

    {
      title: t('table:table-challenge-name'),
      dataIndex: 'challengeName',
      key: 'challengeName',
      align: alignLeft,
      width: 74,
      render: (type: any) => {
        return <span className="truncate whitespace-nowrap">{type}</span>;
      },
    },

    {
      title: t('table:table-proposal-link'),
      dataIndex: 'proposalLink',
      key: 'proposalLink',
      width: 120,
      align: 'center',
      ellipsis: true,
      render: (shop: any) => (
        <span className="truncate whitespace-nowrap">{shop}</span>
      ),
    },

    {
      title: t('table:table-buget-proposal'),
      dataIndex: 'bugetProposal',
      key: 'bugetProposal',
      width: 120,
      align: 'center',
      ellipsis: true,
      render: (shop: any) => (
        <span className="truncate whitespace-nowrap">{shop}</span>
      ),
    },

    // {
    //   title: t('table:table-summary-proposal'),
    //   dataIndex: 'summaryProposal',
    //   key: 'summaryProposal',
    //   width: 120,
    //   align: 'center',
    //   ellipsis: true,
    //   render: (shop: any) => (
    //     <span className="truncate whitespace-nowrap">{shop}</span>
    //   ),
    // },

    {
      title: t('table:table-total-description'),
      dataIndex: 'descriptionDetail',
      key: 'descriptionDetail',
      width: 120,
      align: 'center',
      ellipsis: true,
      render: (shop: any) => (
        <span className="truncate whitespace-nowrap">{shop}</span>
      ),
    },

    {
      title: t('table:table-total-vote'),
      dataIndex: 'voteCount',
      key: 'voteCount',
      width: 120,
      align: 'center',
      ellipsis: true,
      render: (type: any) => {
        return <span className="truncate whitespace-nowrap">{type}</span>;
      },
    },

    {
      title: t('table:table-up-vote-count'),
      dataIndex: 'upVoteCount',
      key: 'upVoteCount',
      width: 120,
      align: 'center',
      ellipsis: true,
      render: (type: any) => {
        return <span className="truncate whitespace-nowrap">{type}</span>;
      },
    },

    {
      title: t('table:table-down-vote-count'),
      dataIndex: 'downVoteCount',
      key: 'downVoteCount',
      width: 120,
      align: 'center',
      ellipsis: true,
      render: (type: any) => {
        return <span className="truncate whitespace-nowrap">{type}</span>;
      },
    },

    {
      title: t('table:table-proposer-User'),
      dataIndex: 'proposerUser',
      key: 'proposerUser',
      width: 120,
      align: 'center',
      ellipsis: true,
      render: (shop: any) => (
        <span className="truncate whitespace-nowrap">{shop}</span>
      ),
    },
  ];

  if (router?.query?.shop) {
    columns = columns?.filter((column) => column?.key !== 'shop');
  }

  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table
          /* @ts-ignore */
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={products?.data}
          rowKey="id"
          scroll={{ x: 900 }}
        />
      </div>

      {!!paginatorInfo?.totalpage && (
        <div className="flex items-center justify-end">
          <Pagination
            total={paginatorInfo.totalpage * paginatorInfo.limit}
            current={paginatorInfo.currentpage}
            pageSize={paginatorInfo.limit}
            onChange={onPagination}
            showLessItems
          />
        </div>
      )}
    </>
  );
};

export default ProductList;
