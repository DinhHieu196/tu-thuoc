import {
    FETCHING_DATA_LIKE,
    FETCHING_DATA_SUCCESS_LIKE,
    FETCHING_DATA_FAILURE_LIKE,
    DELETE_DATA_LIKE,
    ADD_ITEM_LIKE,
} from './../Constants/likeConstain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {put, takeEvery} from 'redux-saga/effects'

const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('@like_store');
        if (value !== null) {
            return JSON.parse(value);
        }
        return [];
    } catch (e) {
        return [];
    }
};
const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('@like_store', value);
    } catch (e) {
        // saving error
    }
};

function* addItemLike(action) {
    try {
        storeData(action.data)
        const response = yield getData();
        yield put({type: FETCHING_DATA_SUCCESS_LIKE, data: response});
    } catch (e) {
        yield put({type: FETCHING_DATA_FAILURE_LIKE, data: {message: 'Thêm thất bại'}})
    }
}

function* fetchDataLike() {
    try {
        const response = yield getData();
        yield put({type: FETCHING_DATA_SUCCESS_LIKE, data: response});
    } catch (e) {
        yield put({type: FETCHING_DATA_FAILURE_LIKE, data: {message: ''}})
    }
}

function* dataSaga() {
    yield takeEvery(FETCHING_DATA_LIKE, fetchDataLike);
    // yield takeEvery(DELETE_DATA_LIKE, deleteData);
    yield takeEvery(ADD_ITEM_LIKE, addItemLike);
}

export default dataSaga