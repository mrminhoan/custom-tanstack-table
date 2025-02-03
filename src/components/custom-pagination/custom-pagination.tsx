import { Table } from '@tanstack/react-table';
import { usePagination } from '@mantine/hooks';
import { PAGINATION } from '../../contansts/constants';
import { BaseSearchModel } from '../../models/class/model-base-search';
import { useEffect, useRef, useState } from 'react';

interface IProps<T> {
  useTable: Table<T>;
  onPageChange: (value: Partial<BaseSearchModel>) => void;
  params: Partial<BaseSearchModel>;
  totalItems: number;
}
function CustomPagination<T>(props: IProps<T>) {
  const { onPageChange, params, totalItems } = props;
  const refParams = useRef(params);
  const { limit, showPage } = refParams.current;

  const currentPage = showPage;
  const [totalPages, setTotalPages] = useState(0);

  const { range, setPage } = usePagination({
    total: totalPages,
    siblings: 1,
    boundaries: 2,
    page: currentPage,
    onChange: (page) => {
      handlePageChange(page);
    },
  });

  const compareParams = () => {
    return JSON.stringify(refParams.current) === JSON.stringify(params);
  };

  useEffect(() => {
    if (!compareParams()) {
      refParams.current = params;
    }
    setTotalPages(Math.ceil(totalItems / limit));
  }, [params, totalItems, limit]);

  const handlePageChange = (showPage: number) => {
    const offset = (showPage - 1) * limit;
    onPageChange({
      offset,
      showPage,
    });
  };

  const hanldeChangeLimit = (limit: number) => {
    onPageChange({
      limit,
    });
  };

  const getCanNextPage = () => {
    return currentPage < totalPages;
  };
  
  const getCanPreviousPage = () =>{
    return currentPage > 1
  }

  return (
    <div className="flex justify-center mt-[20px] gap-5 flex-wrap">
      <button
        onClick={() => setPage(1)}
        disabled={currentPage === 1}
        className={`${currentPage === 1 ? 'opacity-20' : ''}`}
      >
        ⏪
      </button>

      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${currentPage === 1 ? 'opacity-20' : ''}`}
      >
        ◀️
      </button>
      {range.map((item, index) => {
        if (item === 'dots') {
          return <span key={`dots-${index}`}>...</span>;
        }
        return (
          <button
            key={item}
            onClick={() => setPage(item as number)}
            className={`${currentPage === item ? 'font-bold underline' : ''}`}
          >
            {item}
          </button>
        );
      })}

      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={!getCanNextPage()}
        className={`${!getCanNextPage() ? 'opacity-20' : ''}`}
      >
        ▶️
      </button>

      <button
        onClick={() => setPage(totalPages)}
        disabled={!getCanNextPage()}
        className={`${!getCanNextPage() ? 'opacity-20' : ''}`}
      >
        ⏩
      </button>

      <select
        value={limit}
        onChange={(e) => hanldeChangeLimit(parseInt(e.target.value, 10))}
      >
        {PAGINATION.PAGE_SIZE.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CustomPagination;
