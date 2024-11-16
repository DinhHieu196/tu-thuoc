import { FETCHING_DATA } from '../Constants/categoryPageConstain';

export function fetchCategory() {
    return {
        type: FETCHING_DATA,
    }
}