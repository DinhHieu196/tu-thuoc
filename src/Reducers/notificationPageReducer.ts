import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from '../Constants/notificationConstain';

const initState = {
    data: [],
    dataFetched: false,
    isFetching: false,
    error: false
};

export default function notificationPageReducer (state = initState, action: any) {
    switch (action.type) {
        case FETCHING_DATA:
            return { ...state, isFetching: true };
        case FETCHING_DATA_SUCCESS:
            return { ...state, data: action.data,isFetching: false };
        case FETCHING_DATA_FAILURE:
            return { ...state, data: [],isFetching: false, error:true };
        default:
            return state
    }
}
