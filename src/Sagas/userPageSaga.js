import { get } from 'lodash';
import {
    FETCHING_DATA,
    FETCHING_DATA_SUCCESS,
    FETCHING_DATA_FAILURE,
    FETCHING_USER_DATA,
    FETCHING_USER_DATA_SUCCESS,
    LOGOUT_ACTION_PAGE,
    LOGOUT_ACTION_PAGE_SUCCESS,
    FETCHING_REPORT_DATA,
    FETCHING_REPORT_SUCCESS,
    FETCHING_COMMISSION,
    FETCHING_COMMISSION_SUCCESS,
} from './../Constants/userConstain';
import Config from '../config';
import { storeData, getData } from '../Utilities/Storage';
import axios from "axios";
import { put, takeEvery } from 'redux-saga/effects'
import AsyncStorage from '@react-native-async-storage/async-storage';

function* fetchData(action) {
    console.log(`${Config.api.api_base_url}/api/login/phone`);
    try {
        const data = {
            phone: get(action, 'data.phone', ''),
            password: get(action, 'data.password', '')
        }
        const response = yield axios.post(`${Config.api.api_base_url}/api/login/phone`, data);
        console.log(response)
        if (response.data.success) {
            yield storeData('userData', JSON.stringify(response.data.data.access_token));
            yield put({ type: FETCHING_DATA_SUCCESS, data: response.data.data })
        } else {
            yield put({ type: FETCHING_DATA_FAILURE, data: { message: response.data.message } })
        }
    } catch (e) {
        console.log(e)
        yield put({ type: FETCHING_DATA_FAILURE, data: { message: 'Lỗi hệ thống, vui lòng thử lại sau' } })
    }
}

function* fetchDataStore() {
    try {
        const data = yield getData('userData');
        const response = yield axios.get(`${Config.api.api_base_url}/api/profile`, { headers: { "Authorization": `Bearer ${data}` } });
        console.log(response)
        if (response.data.success) {
            yield put({ type: FETCHING_USER_DATA_SUCCESS, data: { token: data, userInfo: response.data.data } });
        }
    } catch (e) {
        // yield put({ type: FETCHING_DATA_FAILURE, data: { message: 'Lỗi hệ thống, vui lòng thử lại sau' } })
    }
}

function* fetchDataReport() {
    try {
        const data = yield getData('userData');
        const revenue = yield axios.get(`${Config.api.api_base_url}/api/report/revenue`, { headers: { "Authorization": `Bearer ${data}` } });
        const refund = yield axios.get(`${Config.api.api_base_url}/api/report/refund`, { headers: { "Authorization": `Bearer ${data}` } });
        const referral = yield axios.get(`${Config.api.api_base_url}/api/report/referral`, { headers: { "Authorization": `Bearer ${data}` } });
        const commission = yield axios.get(`${Config.api.api_base_url}/api/report/commission`, { headers: { "Authorization": `Bearer ${data}` } });

        yield put({
            type: FETCHING_REPORT_SUCCESS,
            data: {
                revenue: revenue.data.data,
                refund: refund.data.data,
                referral: referral.data.data,
                commission: commission.data.data,
            }
        });

    } catch (e) {
        // yield put({ type: FETCHING_DATA_FAILURE, data: { message: 'Lỗi hệ thống, vui lòng thử lại sau' } })
    }
}

function* fetchDataCommission(action) {
    try {
        const data = yield getData('userData');
        let params = `?start_date=${action.startDate}&end_date=${action.endDate}`
        const commission = yield axios.get(`${Config.api.api_base_url}/api/report/commission${params}`, { headers: { "Authorization": `Bearer ${data}` } });
        yield put({
            type: FETCHING_COMMISSION_SUCCESS,
            data: {
                commission: commission.data.data,
                startDate: action.startDate,
                endDate: action.endDate,
            }
        });

    } catch (e) {
        // yield put({ type: FETCHING_DATA_FAILURE, data: { message: 'Lỗi hệ thống, vui lòng thử lại sau' } })
    }
}

function* logoutData() {
    yield AsyncStorage.removeItem('userData');
    yield put({ type: LOGOUT_ACTION_PAGE_SUCCESS });
}

function* dataSaga() {
    yield takeEvery(FETCHING_DATA, fetchData);
    yield takeEvery(FETCHING_USER_DATA, fetchDataStore);
    yield takeEvery(FETCHING_REPORT_DATA, fetchDataReport);
    yield takeEvery(LOGOUT_ACTION_PAGE, logoutData);
    yield takeEvery(FETCHING_COMMISSION, fetchDataCommission);

}

export default dataSaga
