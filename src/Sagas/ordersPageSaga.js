import { FETCHING_DATA_ORDER, FETCHING_DATA_ORDER_FAILURE, FETCHING_DATA_ORDER_SUCCESS, REFRESH_DATA_ORDER } from './../Constants/ordersPageConstain';
import Config from '../config';
import axios from "axios";
import { put, takeEvery } from 'redux-saga/effects'
import { storeData, getData } from '../Utilities/Storage';

function* fetchDataOrders(action) {
    try {
        const data = yield getData('userData');
        const response = yield axios.get(`${Config.api.api_base_url}/api/orders/history?page=${action.page}&phone=${action.phone}`, { headers: { "Authorization": `Bearer ${data}` } });
        yield put({ 
            type: FETCHING_DATA_ORDER_SUCCESS, 
            data: response.data.data, 
            currentPage: response.data.current_page,
            lastPage: response.data.last_page,
        })
    } catch (e) {
        yield put({ type: FETCHING_DATA_ORDER_FAILURE })
    }
}

function* dataSaga() {
    yield takeEvery(FETCHING_DATA_ORDER, fetchDataOrders);
}

export default dataSaga