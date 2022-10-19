import { all } from "redux-saga/effects";
import { CitiesWatcher } from "./Cities/CitiesWatcher";
import { VacanciesWatcher } from "./Vacancies/VacanciesWatcher";

export function* rootWatcher() {
  yield all([CitiesWatcher(), VacanciesWatcher()]);
}
