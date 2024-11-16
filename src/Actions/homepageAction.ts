import { FETCHING_DATA, PUSH_DEVICE_TOKEN } from '../Constants/homepageConstain';

export function fetchData() {
    return {
        type: FETCHING_DATA
    }
}

export function pushDeviceToken() {
    return {
        type: PUSH_DEVICE_TOKEN,
    }
}