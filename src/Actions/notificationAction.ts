import { FETCHING_DATA } from '../Constants/notificationConstain';

export function fetchData(id: any) {
    return {
        type: FETCHING_DATA,
        id
    }
}
