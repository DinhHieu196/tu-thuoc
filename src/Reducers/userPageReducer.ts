// @ts-ignore
import { get } from 'lodash';
import {
    FETCHING_DATA,
    FETCHING_DATA_SUCCESS,
    FETCHING_DATA_FAILURE,
    REST_VALUE,
    FETCHING_USER_DATA,
    FETCHING_USER_DATA_SUCCESS,
    FETCHING_USER_DATA_FAILURE,
    LOGOUT_ACTION_PAGE_SUCCESS,
    ADD_ADDRESS_FAILURE,
    REQUEST_FORGOT_PASSWORD,
    FETCHING_REPORT_SUCCESS,
    FETCHING_COMMISSION_SUCCESS
} from '../Constants/userConstain';

const initState = {
    data: "",
    userInfo: {},
    isLogout: false,
    dataFetched: false,
    isFetching: false,
    message: '',
    error: false,
    revenue: [],
    refund: [],
    referral: [],
    commission: {},
};

export default function userPageReducer(state = initState, action: any) {
    switch (action.type) {
        case FETCHING_DATA:
            return { ...state, isFetching: true, message: '', isLogout: false };
        case FETCHING_DATA_SUCCESS:
            return {
                ...state,
                data: get(action, 'data', ""),
                isFetching: false,
                message: get(action, 'data.message', 'Đăng nhập thành công'),
                dataFetched: true,
                isLogout: false
            };
        case FETCHING_DATA_FAILURE:
            return {
                ...state,
                data: "",
                isFetching: false,
                error: true,
                message: get(action, 'data.message', ''),
                dataFetched: true,
                isLogout: false
            };
        case ADD_ADDRESS_FAILURE:
            return {
                ...state,
                error: true,
                dataFetched: true,
                message: get(action, 'data.message', '')
            }
        case REQUEST_FORGOT_PASSWORD: {
            return {
                ...state,
                isFetching: true,
                message: ''
            }
        }
        case REST_VALUE:
            return initState;
        case FETCHING_USER_DATA:
            return { ...state, isFetching: true };
        case FETCHING_USER_DATA_SUCCESS:
            return {
                ...state,
                data: get(action, 'data.token', []),
                userInfo: get(action, 'data.userInfo', {}),
                isFetching: false,
                dataFetched: true,
                message: '',
                isLogout: false
            };
        case FETCHING_USER_DATA_FAILURE:
            return {
                ...state,
                dataFetched: true,
                isLogout: false
            };
        case FETCHING_COMMISSION_SUCCESS:
            console.log(get(action, 'data', {}));
            return {
                ...state,
                commission: get(action, 'data', {}),
            };
        case FETCHING_REPORT_SUCCESS:
            return {
                ...state,
                revenue: get(action, 'data.revenue', []),
                refund: get(action, 'data.refund', []),
                referral: get(action, 'data.referral', []),
                commission: get(action, 'data.commission', {}),
            };
        case LOGOUT_ACTION_PAGE_SUCCESS: {
            return {
                ...state,
                data: [],
                userInfo: [],
                registerInfo: [],
                dataFetched: false,
                isFetching: false,
                message: '',
                error: false,
                isLogout: true,
            }
            // return initState;
        }
        default:
            return state
    }
}