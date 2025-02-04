import { SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import { SORT_TYPE } from '../contansts/constants';

export function useSorting(initialField = "", initialOrder = SORT_TYPE.DESC) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: initialField, desc: initialOrder === initialField },
  ]);

  return {
    sorting,
    onSortingChange: setSorting,
    order: !sorting?.length
      ? initialField
      : sorting[0].desc
        ? SORT_TYPE.DESC
        : SORT_TYPE.ASC,
    key: sorting?.length ? sorting[0].id : initialField,
  };
}
