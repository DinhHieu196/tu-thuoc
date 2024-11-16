import { FETCHING_DATA, FETCHING_DVT } from '../Constants/detailPageConstain';

export function fetchData(id: any) {
    return {
        type: FETCHING_DATA,
        data: id
    }
}
export function fetchDvt() {
    return {
        type: FETCHING_DVT,
    }
}