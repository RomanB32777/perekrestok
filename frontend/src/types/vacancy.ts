export interface IVacancy {
  vacancy_name: string;
  prev_vacancy_name: string;
  photo_link: string;
  descriptions: string[];
  salary: string;
  vacancy_id: string;
}

export interface IVacancyAction {
  type: string;
  payload: IVacancy[];
}

