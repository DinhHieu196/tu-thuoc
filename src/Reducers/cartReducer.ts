import {forEach, replace, toNumber} from 'lodash';
import {number_format} from '../Utilities/Number';
import {
    FETCHING_DATA,
    FETCHING_DATA_SUCCESS,
    FETCHING_DATA_FAILURE,
    PAY_ORDER_REQUEST,
    PAY_ORDER_REQUEST_SUCCESS, 
    PAY_ORDER_REQUEST_FAILURE,
    RESET_CART
} from '../Constants/cartPageConstain';

const initState = {
    data: [],
    payOrder: false,
    message: '',
    price: 0,
    dataFetched: false,
    isFetching: false,
    error: false
};

export default function cartPageReducer(state = initState, action: any) {
    switch (action.type) {
        case FETCHING_DATA:
            return {...state, isFetching: true, error: false, payOrder: false, message: ''};
        case FETCHING_DATA_SUCCESS:
            let price = 0;
            forEach(action.data, (val) => {
                let priceFormat = val.promotion_cost === 0 ? val.base_cost : val.promotion_cost;
                price += priceFormat * val.quantity;
            });
            return {...state, data: action.data, isFetching: false, price: number_format(price, 0, '', '.') + 'đ'};
        case FETCHING_DATA_FAILURE:
            return {...state, data: [], isFetching: false, error: true};
        case PAY_ORDER_REQUEST:
            return {...state, isFetching: true, error: false, payOrder: false};
        case PAY_ORDER_REQUEST_SUCCESS:
            return {...state, data: [], isFetching: false, error: false, payOrder: true, message: action.message};
        case PAY_ORDER_REQUEST_FAILURE:
            return {...state, isFetching: false, error: true, payOrder: false, message: action.message};
        case RESET_CART:
            return initState;
        default:
            return state
    }
}