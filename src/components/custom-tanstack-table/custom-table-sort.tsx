import { Column } from '@tanstack/react-table';

type TProps<T> = {
  column: Column<T>;
};
function CustomTableSort<T>(props: TProps<T>) {
  const { column } = props;
  return (
    <>
      {column.getIsSorted() ? (
        ({
          asc: <i className="fa fa-sort-asc" aria-hidden="true"></i>,
          desc: <i className="fa fa-sort-desc" aria-hidden="true"></i>,
        }[column.getIsSorted() as string] ?? null)
      ) : (
        <i className="fa fa-sort" aria-hidden="true"></i>
      )}
    </>
  );
}

export default CustomTableSort;
