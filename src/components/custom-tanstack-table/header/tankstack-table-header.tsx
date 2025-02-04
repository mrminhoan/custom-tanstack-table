import { Column, flexRender, Table } from '@tanstack/react-table';
import './tankstack-table-header.scss';
import { useTableContext } from '../../../context/tanstack-table/table-context';
import { getCommonPinningStyle } from '../../../utils';
function TableHeader<T>() {
  const { tableState } = useTableContext<T>();

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
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        <div
                          className={`${metaColumn?.sort ? 'cursor-pointer' : ''}`}
                          onClick={
                            metaColumn?.sort
                              ? header.column.getToggleSortingHandler()
                              : undefined
                          }
                        >
                          {metaColumn?.sort &&
                            (header.column.getIsSorted() ? (
                              ({
                                asc: (
                                  <i
                                    className="fa fa-sort-asc"
                                    aria-hidden="true"
                                  ></i>
                                ),
                                desc: (
                                  <i
                                    className="fa fa-sort-desc"
                                    aria-hidden="true"
                                  ></i>
                                ),
                              }[header.column.getIsSorted() as string] ?? null)
                            ) : (
                              <i className="fa fa-sort" aria-hidden="true"></i>
                            ))}
                        </div>
                      </div>
                      {!header.isPlaceholder && header.column.getCanPin() && (
                        <div>
                          {header.column.getIsPinned() !== 'left' ? (
                            <button
                              className="border rounded px-2"
                              onClick={() => {
                                header.column.pin('left');
                              }}
                            >
                              {'<='}
                            </button>
                          ) : (
                            <button
                              className="border rounded px-2"
                              onClick={() => {
                                header.column.pin(false);
                              }}
                            >
                              {'X'}
                            </button>
                          )}

                          {header.column.getIsPinned() !== 'right' ? (
                            <button
                              className="border rounded px-2"
                              onClick={() => {
                                header.column.pin('right');
                              }}
                            >
                              {'=>'}
                            </button>
                          ) : (
                            <button
                              className="border rounded px-2"
                              onClick={() => {
                                header.column.pin(false);
                              }}
                            >
                              {'X'}
                            </button>
                          )}
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
