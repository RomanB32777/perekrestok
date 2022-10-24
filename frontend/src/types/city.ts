import { IAdminFormItem } from "./admin";

export interface ICity {
  city_name: string;
  prev_city_name: string;
  vacancies?: string[];
}

export interface ICityStore {
  selected_city: string;
  cities: ICity[];
}

export interface ICityAction {
  type: string;
  payload: ICity[] | string;
}

type ICityData = {
  [key in keyof ICity]: IAdminFormItem;
};

export type { ICityData };
