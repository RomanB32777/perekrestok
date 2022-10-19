import { call, put, takeEvery } from "redux-saga/effects";
import { baseURL } from "../../axiosClient";
import { setLoading } from "../../store/types/Loading";
import { setVacancies, GET_VACANCIES } from "../../store/types/Vacancies";

const asyncGetVacancies = async (selected_city: string) => {
  const url = `${baseURL}/api/vacancy/${selected_city ? `?selected_city=${selected_city}` : ''}` 
  const response = await fetch(url);
  if (response.status === 200) {
    const result = await response.json();
    return result;
  }
};

function* VacanciesWorker(action: any): any {
  yield put(setLoading(true));
  const data: any = yield call(asyncGetVacancies, action.payload);
  if (data) {
    yield put(setVacancies(data));
  }
  yield put(setLoading(false));
}

export function* VacanciesWatcher() {
  yield takeEvery(GET_VACANCIES, VacanciesWorker);
}
