import { flexRender } from '@tanstack/react-table';
import { useTableContext } from '../../../context/tanstack-table/table-context';
import { getCommonPinningStyle } from '../../../utils';

function TableBody<T>() {
  const { tableState } = useTableContext<T>();
 
  //   const isLastLeftPinnedColumn =
  //     isPinned === 'left' && column.getIsLastColumn("left");
  //   const isFirstRightPinnedColumn =
  //     isPinned === 'right' && column.getIsFirstColumn("right");

  //   return {
  //     boxShadow: isLastLeftPinnedColumn
  //       ? '-4px 0 4px -4px gray inset'
  //       : isFirstRightPinnedColumn
  //         ? '4px 0 4px -4px gray inset'
  //         : undefined,
  //     left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
  //     right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
  //     opacity: isPinned ? 0.95 : 1,
  //     position: isPinned ? ('sticky' as const) : ('relative' as const),
  //     width: column.getSize(),
  //     zIndex: isPinned ? 1 : 0,
  //   };
  // };
  return (
    <tbody>
      {tableState.getRowModel().rows.map((row) => {
        return (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              const { column } = cell;
              return (
                <td
                  key={cell.id}
                  style={{
                    width: cell.column.getSize(),
                    ...getCommonPinningStyle(column),
                  }}
                >
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
