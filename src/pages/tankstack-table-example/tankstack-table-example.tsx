import { ColumnDef } from '@tanstack/react-table';
import './tanstack-table-example.scss';
import CustomTanStackTable from '../../components/custom-tanstack-table/table/custom-tankstack-table';
import { _SORT_TYPE } from '../../contansts/constants';
import { useState } from 'react';
import { getList } from '../../service/user-service';
import { useQuery } from '@tanstack/react-query';
import { UserModel } from '../../models/class/user/model-user';
import { BaseSearchModel } from '../../models/class/model-base-search';
import CustomSpin from '../../components/custom-spin/custom-spin';

function TableExample() {
  const [params, setParams] = useState<Partial<BaseSearchModel>>(
    new BaseSearchModel(),
  );
  const columns: ColumnDef<UserModel>[] = [
    {
      accessorKey: 'firstName',
      header: 'First Name',
      meta: {
        sort: true,
      },
      size: 500, 

    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
      meta: {
        sort: true,
      },
      size: 500, 

    },
    {
      accessorKey: 'age',
      header: 'Age',
      meta: {
        sort: true,
      },
      size: 500, 

    },
    {
      accessorKey: 'email',
      header: 'Email',
      size: 500, 

    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      size: 500, 
    },
  ];


  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['user', params],
    queryFn: () => getList(params),
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
  });

  const onPageChange = (value: Partial<BaseSearchModel>) => {
    setParams((prev) => ({
      ...prev,
      ...value,
    }));
  };

  return (
    <div className="px-5 m-2 ">
      <CustomSpin loading={isLoading || isFetching}>
        <CustomTanStackTable
          columns={columns}
          data={data?.data?.data || []}
          total={data?.data?.total}
          onPageChange={onPageChange}
          params={params}
          pagination
        />
      </CustomSpin>
    </div>
  );
}

export default TableExample;
