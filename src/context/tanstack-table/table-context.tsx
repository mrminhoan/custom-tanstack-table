import { ColumnPinningState, Table } from '@tanstack/react-table';
import React, { PropsWithChildren, useContext } from 'react';
import _ from 'lodash';

interface IPropsProvider<T> {
  tableState: Table<T>;
  // onPinning: React.Dispatch<React.SetStateAction<ColumnPinningState>>;
}

const createTableContext = _.once(<T,>() =>
  React.createContext<IPropsProvider<T> | null>(null),
);

export function useTableContext<T>() {
  const context = useContext(createTableContext<T>());
  return context;
}

export function TableProvider<T>(props: PropsWithChildren<IPropsProvider<T>>) {
  const { tableState, children } = props;
  const TableContext = createTableContext<T>();
  return (
    <TableContext.Provider value={{ tableState }}>
      {children}
    </TableContext.Provider>
  );
}
