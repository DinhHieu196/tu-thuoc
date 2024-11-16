import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE, FETCHING_NEXT } from '../Constants/categoryPageConstain';

const initState = {
    data: [],
    dataFetched: false,
    isFetching: false,
    error: false
};

export default function detailPageReducer(state = initState, action: any) {
    switch (action.type) {
        case FETCHING_DATA:
            return { ...state, isFetching: true, error: false };
        case FETCHING_DATA_SUCCESS:
            return { ...state, data: action.data, isFetching: false, error: false };
        case FETCHING_DATA_FAILURE:
            return { ...state, data: [], isFetching: false, error: true };
        default:
            return state
    }
}