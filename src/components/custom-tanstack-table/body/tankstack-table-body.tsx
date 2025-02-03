import { flexRender, Table } from '@tanstack/react-table';

interface IProps<T> {
  useTable: Table<T>;
}
function TableBody<T>(props: IProps<T>) {
  const { useTable } = props;
  return (
    <tbody>
      {useTable.getRowModel().rows.map((row) => {
        return (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              return (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableBody;
