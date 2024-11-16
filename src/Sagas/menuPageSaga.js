import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from './../Constants/menuConstain';
import Config from '../config';
import axios from "axios";
import { put, takeEvery } from 'redux-saga/effects'
import {storeData, getData} from '../Utilities/Storage';

function* fetchData (action) {
    try {
        const data = yield getData('userData');
        const response = yield axios.get(`${Config.api.api_base_url}/api/category`, { headers: {"Authorization" : `Bearer ${data}`} });
        // yield put({ type: FETCHING_DATA_SUCCESS,   data: response.data.data })
    } catch (e) {
        yield put({ type: FETCHING_DATA_FAILURE })
    }
}

function* dataSaga () {
    yield takeEvery(FETCHING_DATA, fetchData)
}

export default dataSaga