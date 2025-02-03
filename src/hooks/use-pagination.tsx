import { PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { PAGINATION } from '../contansts/constants';

export function usePagination() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGINATION.MAX_SIZE_PER_PAGE,
  });
  const { pageSize, pageIndex } = pagination;

  return {
    onPaginationChange: setPagination,
    pagination,
    limit: pageSize,
    skip: pageSize * pageIndex,
  };
}
