import { IAdminFormItem } from "./../types/admin";
import { initCityData } from "./../consts/cities";
import { filterVacancy } from "../consts";

const initCittVacanciesData: IAdminFormItem = {
  type: "select",
  value: [],
  list: [],
  placeholder: "Добавьте вакансии",
};

type ISetInitCitiesDataParams = {
  [key in keyof IAdminFormItem]?: any;
};

export const getInitCitiesData = (vacanciesFileds: ISetInitCitiesDataParams) =>
  filterVacancy
    ? Object.assign(initCityData, {
        vacancies: { ...initCittVacanciesData, ...vacanciesFileds },
      })
    : initCityData;
