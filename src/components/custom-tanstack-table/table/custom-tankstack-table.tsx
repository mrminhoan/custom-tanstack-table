import {
  ColumnDef,
  ColumnPinningPosition,
  ColumnPinningState,
  getCoreRowModel,
  RowData,
  useReactTable,
} from '@tanstack/react-table';
import CustomPagination from '../../custom-pagination/custom-pagination';
import TableHeader from '../header/tankstack-table-header';
import TableBody from '../body/tankstack-table-body';
import { BaseSearchModel } from '../../../models/class/model-base-search';
import { useSorting } from '../../../hooks/use-sort';
import { useEffect, useMemo, useState } from 'react';
import { TableProvider } from '../../../context/tanstack-table/table-context';
import './custom-tanstack-table.scss';
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
    pinned?: ColumnPinningPosition;
  }
}

function CustomTanStackTable<T>(props: IProps<T>) {
  const { sorting, onSortingChange, order, key } = useSorting();
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: [],
    right: [],
  });
  const { data, columns, pagination, total = 0, onPageChange, params } = props;

  const useTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    onSortingChange: onSortingChange,
    manualPagination: true,
    rowCount: total,
    onColumnPinningChange: setColumnPinning,
    state: {
      sorting,
      columnPinning: columnPinning,
    },
  });

  useEffect(() => {
    const pinned: ColumnPinningState = {
      left: [],
      right: [],
    };
    useTable.getLeafHeaders()?.map((header) => {
      const meta = header?.column?.columnDef?.meta;
      const column = header?.column;
      if (meta?.pinned) {
        pinned[meta.pinned].push(column?.id);
      }
    });
    setColumnPinning(pinned);
  }, []);

  useEffect(() => {
    onPageChange({
      sortBy: key,
      sortType: order,
    });
  }, [order, key]);

  return (
    <>
      <div
        className="overflow-x-auto w-full"
        style={{ willChange: 'transform', overscrollBehavior:"contain" }} // fixed lag when scroll horizontal but still not working
      >
        <table
          className="table-basic"
          style={{ width: useTable.getTotalSize() }}
        >
          <TableProvider tableState={useTable}>
            <TableHeader />
            <TableBody />
          </TableProvider>
        </table>
      </div>
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

export default CustomTanStackTable;
