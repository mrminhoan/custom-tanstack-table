import { flexRender, Table } from '@tanstack/react-table';
import "./tankstack-table-header.scss"
interface IProps<T> {
  useTable: Table<T>;
}
function TableHeadder<T>(props: IProps<T>) {
  const { useTable } = props;
  return (
    <thead>
      {useTable.getHeaderGroups().map((headerGroup) => {
        return (
          <tr key={headerGroup.id} className='table-header'>
            {headerGroup.headers.map((header) => {
              const metaColumn = header.column.columnDef.meta;
              return (
                <th
                  key={header.id}
                  className={`${metaColumn?.sort ? 'cursor-pointer' : ''}`}
                  onClick={
                    metaColumn?.sort
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                >
                  {header.isPlaceholder ? null : (
                    <>
                      <div className="flex justify-between items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

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

export default TableHeadder;
