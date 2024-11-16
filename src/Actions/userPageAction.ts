import {
    FETCHING_DATA,
    REST_VALUE,
    FETCHING_USER_DATA,
    FETCHING_USER_DATA_REGISTER,
    LOGOUT_ACTION_PAGE,
    FETCHING_REPORT_DATA,
    FETCHING_COMMISSION
} from '../Constants/userConstain';
import {put} from "redux-saga/effects";

export function loginAction(phone: string, password: string) {
    return {
        type: FETCHING_DATA,
        data: {
            phone,
            password
        }
    }
}

export function logoutAction() {
    return {
        type: LOGOUT_ACTION_PAGE
    }
}

export function registerData(data: any) {
    return {
        type: FETCHING_USER_DATA_REGISTER,
        data
    };

}

export function resetAction() {
    return {
        type: REST_VALUE
    }
}

export function getUserData() {
    return {
        type: FETCHING_USER_DATA
    }
}

export function getReport() {
    return {
        type: FETCHING_REPORT_DATA
    }
}

export function fetchCommission(startDate?: string, endDate?: string) {
    return {
        type: FETCHING_COMMISSION,
        startDate,
        endDate,
    }
}



