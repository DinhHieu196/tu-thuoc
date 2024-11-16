import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from './../Constants/notificationConstain';
import Config from '../config';
import axios from "axios";
import { put, takeEvery } from 'redux-saga/effects'
function* fetchData (action) {
    try {
        const response = yield axios.get(`${Config.api.api_base_url}/api/notification/lists?user_id=${action.id}`);
        yield put({ type: FETCHING_DATA_SUCCESS, data: response.data })
    } catch (e) {
        yield put({ type: FETCHING_DATA_FAILURE })
    }
}

function* dataSaga () {
    yield takeEvery(FETCHING_DATA, fetchData)
}

export default dataSaga
