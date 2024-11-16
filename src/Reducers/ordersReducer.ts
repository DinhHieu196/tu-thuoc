import { FETCHING_DATA_ORDER, FETCHING_DATA_ORDER_SUCCESS, FETCHING_DATA_ORDER_FAILURE, REFRESH_DATA_ORDER } from '../Constants/ordersPageConstain';

const initState = {
    data: [],
    currentPage: 1,
    lastPage: 1,
    dataFetched: false,
    isFetching: false,
    error: false
};

export default function ordersReducer(state = initState, action: any) {
    switch (action.type) {
        case FETCHING_DATA_ORDER:
            return { ...state, isFetching: true, error: false };
        case FETCHING_DATA_ORDER_SUCCESS:
            const orders = action.data.search != "" && action.data.current_page == 1 ? [...action.data.data] : [...state.data, ...action.data.data];
            return {
                ...state,
                data: orders,
                lastPage: action.data.last_page,
                currentPage: action.data.current_page,
                isFetching: false,
                error: false,
            };
        case FETCHING_DATA_ORDER_FAILURE:
            return { ...state, data: [], isFetching: false, error: true };
        case REFRESH_DATA_ORDER:
            return initState;
        default:
            return state
    }
}