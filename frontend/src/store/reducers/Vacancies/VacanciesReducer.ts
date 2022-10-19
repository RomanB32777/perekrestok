import { IVacancy, IVacancyAction } from "../../../types";
import { SET_VACANCIES } from "../../types/Vacancies";

const initialState: IVacancy[] = [];

const VacanciesReducer = (state = initialState, action: IVacancyAction) => {
  switch (action.type) {
    case SET_VACANCIES:
      return action.payload;

    default:
      return state;
  }
};

export default VacanciesReducer;
