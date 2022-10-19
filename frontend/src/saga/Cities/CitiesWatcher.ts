import { call, put, takeEvery } from "redux-saga/effects";
import { baseURL } from "../../axiosClient";
import { setLoading } from "../../store/types/Loading";
import { setCities, GET_CITIES } from "../../store/types/Cities";

const asyncGetCities = async () => {
  const response = await fetch(`${baseURL}/api/city/`);
  if (response.status === 200) {
    const result = await response.json();
    return result;
  }
};

function* CitiesWorker(): any {
  yield put(setLoading(true));
  const data: any = yield call(asyncGetCities);
  if (data) {
    yield put(setCities(data));
  }
  yield put(setLoading(false));
}

export function* CitiesWatcher() {
  yield takeEvery(GET_CITIES, CitiesWorker);
}
