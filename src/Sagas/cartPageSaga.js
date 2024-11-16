import {
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE,
  DELETE_DATA,
  PAY_ORDER_REQUEST,
  PAY_ORDER_REQUEST_SUCCESS,
  PAY_ORDER_REQUEST_FAILURE,
  CHANGE_QUANTITY,
  ADD_ITEM_CART,
} from "./../Constants/cartPageConstain";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getData } from "../Utilities/Storage";
import { filter, get } from "lodash";
import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import Config from "../config";

const getDataCart = async () => {
  try {
    const value = await AsyncStorage.getItem("@basket_store");
    if (value !== null) {
      return JSON.parse(value);
    }
    return [];
  } catch (e) {
    return [];
  }
};
const storeDataCart = async (value) => {
  try {
    await AsyncStorage.setItem("@basket_store", value);
  } catch (e) {
    // saving error
  }
};

function* addItemCart(action) {
  try {
    storeDataCart(action.data);
    const response = yield getDataCart();
    yield put({ type: FETCHING_DATA_SUCCESS, data: response });
  } catch (e) {
    yield put({
      type: FETCHING_DATA_FAILURE,
      data: { message: "Thêm thất bại" },
    });
  }
}

function* fetchDataCart() {
  try {
    const response = yield getDataCart();
    yield put({ type: FETCHING_DATA_SUCCESS, data: response });
  } catch (e) {
    yield put({ type: FETCHING_DATA_FAILURE, data: { message: "" } });
  }
}

function* changeQuantity(action) {
  try {
    const response = yield getDataCart();
    response.map((item) => {
      if (item.id == action.data.id) {
        if (action.data.method == "plus") {
          item.quantity = item.quantity + 1;
          return storeDataCart(JSON.stringify(response));
        }
        if (action.data.method == "minus") {
          if (item.quantity == 1) {
            return storeDataCart(JSON.stringify(response));
          } else {
            item.quantity = item.quantity - 1;
            return storeDataCart(JSON.stringify(response));
          }
        }
      }
    });
    yield put({ type: FETCHING_DATA_SUCCESS, data: response });
  } catch (e) {
    yield put({
      type: FETCHING_DATA_FAILURE,
      data: { message: "Tài khoản hoặc mật khẩu sai" },
    });
  }
}

function* deleteData(action) {
  try {
    const response = yield getDataCart();
    let newData = filter(response, (val) => {
      return parseInt(val.id) !== parseInt(get(action, "data.id"));
    });
    yield storeDataCart(JSON.stringify(newData));
    yield put({ type: FETCHING_DATA_SUCCESS, data: newData });
  } catch (e) {
    yield put({ type: FETCHING_DATA_FAILURE });
  }
}

function* payOrderData(action) {
  try {
    const data = yield getData("userData");
    const response = yield axios.post(
      `${Config.api.api_base_url}/api/orders`,
      action.data,
      {
        headers: {
          Authorization: `Bearer ${data}`,
        },
      }
    );
    if (response.data.success) {
      yield AsyncStorage.removeItem("@basket_store");
      yield put({
        type: PAY_ORDER_REQUEST_SUCCESS,
        message: "Đặt hàng thành công",
      });
    } else {
      yield put({
        type: PAY_ORDER_REQUEST_FAILURE,
        message: "Xảy ra lỗi, vui lòng thử lại sau",
      });
    }
  } catch (e) {
    yield put({
      type: PAY_ORDER_REQUEST_FAILURE,
      message: "Xảy ra lỗi, vui lòng thử lại sau",
    });
  }
}

function* dataSaga() {
  yield takeEvery(FETCHING_DATA, fetchDataCart);
  yield takeEvery(CHANGE_QUANTITY, changeQuantity);
  yield takeEvery(DELETE_DATA, deleteData);
  yield takeEvery(PAY_ORDER_REQUEST, payOrderData);
  yield takeEvery(ADD_ITEM_CART, addItemCart);
}

export default dataSaga;
