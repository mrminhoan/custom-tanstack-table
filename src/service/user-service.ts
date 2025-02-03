import { AxiosResponse } from 'axios';
import { APIS } from '../contansts/apis';
import { DefaultData, Person } from '../contansts/data/mock-data';
import { UserModel } from '../models/class/user/model-user';
import axiosInstance from './common/axios';
import { BaseSearchModel } from '../models/class/model-base-search';

export const getList = (
  params: Partial<BaseSearchModel>,
): Promise<AxiosResponse<{ data: UserModel[]; total: number }>> => {
  return axiosInstance
    .get(APIS.USER.LIST, {
      params: {
        limit: params?.limit,
        skip: params?.offset,
        sortBy: params?.sortBy,
        order: params?.sortType?.toLowerCase()
      },
    })
    .then((res) => {
      const data = res?.data;
      if (data) {
        res.data = {
          data: data.users,
          total: data.total,
        };
      }
      return res;
    });
};
