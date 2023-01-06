import { call, put, takeEvery } from "redux-saga/effects";
import { getPersonsSuccess } from "./personState";

function* workGetPersonFetch() {
  let newPersonsData = [];
  const persons = yield call(() =>
    fetch(
      "https://raw.githubusercontent.com/amans2k/amans2k.github.io/master/users.json"
    )
  );
  const beautify = yield persons.json();
  beautify.map((value, i) => 
    newPersonsData.push({
        ...value,
        image: `https://avatars.dicebear.com/api/avataaars/<seed${i}>.svg`,
        like: false,
      })
  );
  yield put(getPersonsSuccess(newPersonsData));
}

function* personSaga() {
  yield takeEvery("persons/getPersonsFetch", workGetPersonFetch);
}

export default personSaga;
