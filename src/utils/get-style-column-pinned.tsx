import { Column } from '@tanstack/react-table';

export const getCommonPinningStyle = <T,>(column: Column<T>) => {
  const isPinned = column.getIsPinned(); //left - right - false
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right');

  return {
    boxShadow: isLastLeftPinnedColumn
      ? '-4px 0 4px -4px gray inset'
      : isFirstRightPinnedColumn
        ? '4px 0 4px -4px gray inset'
        : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? ('sticky' as const) : ('relative' as const),
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};
