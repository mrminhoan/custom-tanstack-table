import { ColumnDef } from '@tanstack/react-table';
import './tanstack-table-example.scss';
import CustomTankStackTable from '../../components/custom-tanstack-table/table/custom-tankstack-table';
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
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
      meta: {
        sort: true,
      },
    },
    {
      accessorKey: 'age',
      header: 'Age',
      meta: {
        sort: true,
      },
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
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
        <CustomTankStackTable
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
