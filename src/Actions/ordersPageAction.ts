import { FETCHING_DATA_ORDER, REFRESH_DATA_ORDER } from '../Constants/ordersPageConstain';

export function fetchDataOrders(phone: any, page: number) {
    return {
        type: FETCHING_DATA_ORDER,
        phone,
        page
    }
}

export function resetOrder() {
    return {
        type: REFRESH_DATA_ORDER
    }
}
