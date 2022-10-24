import { IVacancy, IVacancyAction } from "./vacancy";
import { IAdminFormItem, IAdminValueItem } from "./admin";
import { ICity, ICityData, ICityAction } from "./city";

interface IFileInfo {
  preview: string;
  file: File | null;
}

interface ILoadingAction {
  type: string;
  payload: boolean;
}

export type {
  IFileInfo,
  IAdminValueItem,
  IAdminFormItem,
  ICity,
  ICityAction,
  IVacancy,
  IVacancyAction,
  ILoadingAction,
  ICityData,
};
