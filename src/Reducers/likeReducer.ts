import {
    FETCHING_DATA_LIKE,
    FETCHING_DATA_SUCCESS_LIKE,
    FETCHING_DATA_FAILURE_LIKE,
} from '../Constants/likeConstain';

const initState = {
    data: [],
    message: '',
    dataFetched: false,
    isFetching: false,
    error: false
};

export default function likeReducer(state = initState, action: any) {
    switch (action.type) {
        case FETCHING_DATA_LIKE:
            return {...state, isFetching: true};
        case FETCHING_DATA_SUCCESS_LIKE:
            return {...state, data: action.data, isFetching: false};
        case FETCHING_DATA_FAILURE_LIKE:
            return {...state, data: [], isFetching: false, error: true};
        default:
            return state
    }
}