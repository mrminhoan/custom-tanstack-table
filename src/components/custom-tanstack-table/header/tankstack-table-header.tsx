import { Column, flexRender, Table } from '@tanstack/react-table';
import './tankstack-table-header.scss';
import { useTableContext } from '../../../context/tanstack-table/table-context';
import { getCommonPinningStyle } from '../../../utils';
import CustomTableSort from '../custom-table-sort';
import { ReactNode, useState } from 'react';
import { BaseSearchModel } from '../../../models/class/model-base-search';
import { useDebouncedCallback } from '@mantine/hooks';

type TProps = {
  onPageChange: (value: Partial<BaseSearchModel>) => void;
};

function TableHeader<T>(props: TProps) {
  const { onPageChange } = props;
  const { tableState } = useTableContext<T>();

  const [searchVisibility, setSearchVisibility] = useState<
    Record<string, boolean>
  >({});

  const toggleSearch = (columnId: string) => {
    setSearchVisibility((prev) => ({
      [columnId]: !prev[columnId],
    }));
  };

  const handleChangeSearch = useDebouncedCallback((e, keyword) => {
    onPageChange({
      filter: {
        [keyword]: e.target.value,
      },
    });
  }, 1000);
  return (
    <thead>
      {tableState.getHeaderGroups().map((headerGroup) => {
        return (
          <tr key={headerGroup.id} className="table-header">
            {headerGroup.headers.map((header) => {
              const metaColumn = header.column.columnDef.meta;
              const { column } = header;
              return (
                <th
                  key={header.id}
                  style={{
                    width: header.getSize(),
                    ...getCommonPinningStyle(column),
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <>
                      <div className="flex justify-between items-start">
                        {flexRender(
                          column.columnDef.header,
                          header.getContext(),
                        )}

                        <div className="flex gap-5">
                          {metaColumn?.sort && (
                            <div
                              className={'cursor-pointer'}
                              onClick={
                                metaColumn?.sort
                                  ? column.getToggleSortingHandler()
                                  : undefined
                              }
                            >
                              {metaColumn?.renderSort ? (
                                metaColumn?.renderSort
                              ) : (
                                <CustomTableSort column={column} />
                              )}
                            </div>
                          )}

                          {metaColumn?.canSearch && (
                            <div
                              className="cursor-pointer"
                              onClick={() => toggleSearch(header.id)}
                            >
                              {metaColumn?.renderSearch ? (
                                metaColumn?.renderSearch
                              ) : (
                                <i
                                  className="fa fa-search"
                                  aria-hidden="true"
                                ></i>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {searchVisibility[header.id] && (
                        <div className="mt-2">
                          <input
                            type="text"
                            className="border p-1 w-full"
                            placeholder="Search..."
                            onChange={(e) => handleChangeSearch(e, header.id)}
                          />
                        </div>
                      )}
                    </>
                  )}
                </th>
              );
            })}
          </tr>
        );
      })}
    </thead>
  );
}

export default TableHeader;
