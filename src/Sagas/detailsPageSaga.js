import { 
    FETCHING_DATA, 
    FETCHING_DATA_SUCCESS, 
    FETCHING_DATA_FAILURE,
    FETCHING_DVT,
    FETCHING_DVT_FAILURE,
    FETCHING_DVT_SUCCESS
} from './../Constants/detailPageConstain';
import Config from '../config';
import axios from "axios";
import { put, takeEvery } from 'redux-saga/effects'
import { getData } from '../Utilities/Storage';

function* fetchData(action) {
    try {
        const data = yield getData('userData');
        let productId = action.data;
        const response = yield axios.get(`${Config.api.api_base_url}/api/products/${productId}`, { headers: { "Authorization": `Bearer ${data}` } });
        console.log(response);
        yield put({ type: FETCHING_DATA_SUCCESS, data: response.data.data })
    } catch (e) {
        yield put({ type: FETCHING_DATA_FAILURE })
    }
}

function* fetchDvt() {
    try {
        const data = yield getData('userData');
        const response = yield axios.get(`${Config.api.api_base_url}/api/dvt`, { headers: { "Authorization": `Bearer ${data}` } });
        yield put({ type: FETCHING_DVT_SUCCESS, data: response.data.data })
    } catch (e) {
        yield put({ type: FETCHING_DVT_FAILURE })
    }
}

function* dataSaga() {
    yield takeEvery(FETCHING_DATA, fetchData);
    yield takeEvery(FETCHING_DVT, fetchDvt);
}

export default dataSaga