import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  RowData,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import CustomPagination from '../../custom-pagination/custom-pagination';
import TableHeadder from '../header/tankstack-table-header';
import TableBody from '../body/tankstack-table-body';
import { BaseSearchModel } from '../../../models/class/model-base-search';
import { useSorting } from '../../../hooks/use-sort';
import { useEffect } from 'react';

interface IProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  pagination?: boolean;
  total?: number;
  onPageChange: (value: Partial<BaseSearchModel>) => void;
  params: Partial<BaseSearchModel>;
}

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    sort?: boolean;
  }
}

function CustomTankStackTable<T>(props: IProps<T>) {
  const { sorting, onSortingChange, order, key } = useSorting();
  const {
    data,
    columns,
    pagination,
    total = 0,
    onPageChange,
    params,
  } = props;
  const useTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    onSortingChange: onSortingChange,
    manualPagination: true,
    rowCount: total,
    state: {
      sorting,
    },
  });

  useEffect(() => {
    onPageChange({
      sortBy: key,
      sortType: order,
    });
  }, [order, key]);

  return (
    <>
      <table className="table-basic" 
      // style={{width: useTable.getCenterTotalSize(), overflowX:"auto"}}
      >
        <TableHeadder useTable={useTable} />
        <TableBody useTable={useTable} />
      </table>
      {pagination && (
        <CustomPagination
          useTable={useTable}
          onPageChange={onPageChange}
          params={params}
          totalItems={total}
        />
      )}
    </>
  );
}

export default CustomTankStackTable;
