import { PAGINATION, SORT_TYPE } from '../../contansts/constants';

export type TOrderType = (typeof SORT_TYPE)[keyof typeof SORT_TYPE] | '';

export class BaseSearchModel {
  offset: number = 0;
  limit: number = PAGINATION.LIMIT;
  keyword: string | null = null;
  sortType: TOrderType = SORT_TYPE.ASC;
  showPage: number = 1;
  sortBy: string = ""
}
