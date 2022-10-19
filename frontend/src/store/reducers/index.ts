import { combineReducers } from "redux";
import CitiesReducer from "./Cities/CitiesReducer";
import VacanciesReducer from "./Vacancies/VacanciesReducer";
import LoadingReducer from "./Loading/LoadingReducer";

const store = {
  cities: CitiesReducer,
  vacancies: VacanciesReducer,
  loading: LoadingReducer,
};

const rootReducer = combineReducers(store);

export { rootReducer };
