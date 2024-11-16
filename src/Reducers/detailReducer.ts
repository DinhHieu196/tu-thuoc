import { 
    FETCHING_DATA, 
    FETCHING_DATA_SUCCESS, 
    FETCHING_DATA_FAILURE,
    FETCHING_DVT,
    FETCHING_DVT_FAILURE,
    FETCHING_DVT_SUCCESS,
} from '../Constants/detailPageConstain';

const initState = {
    data: {},
    dvt: [],
    dataFetched: false,
    isFetching: false,
    error: false
};

export default function detailPageReducer(state = initState, action: any) {
    switch (action.type) {
        case FETCHING_DATA:
            return { ...state, isFetching: true };
        case FETCHING_DATA_SUCCESS:
            return { ...state, data: action.data, isFetching: false };
        case FETCHING_DATA_FAILURE:
            return { ...state, data: [], isFetching: false, error: true };
        case FETCHING_DVT:
            return { ...state, isFetching: true };
        case FETCHING_DVT_SUCCESS:
            return { ...state, dvt: action.data, isFetching: false };
        case FETCHING_DVT_FAILURE:
            return { ...state, dvt: [], isFetching: false, error: true };
        default:
            return state
    }
}