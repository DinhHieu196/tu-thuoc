import {FETCHING_DATA, DELETE_DATA, PAY_ORDER_REQUEST, CHANGE_QUANTITY, ADD_ITEM_CART, RESET_CART} from '../Constants/cartPageConstain';

export function fetchDataCart() {
    return {
        type: FETCHING_DATA
    }
}

export function addItemCart (data: string) {
    return {
        type: ADD_ITEM_CART,
        data
    }
}

export function deleteItem(id: any) {
    return {
        type: DELETE_DATA,
        data: {
            id
        }
    }
}

export function changeQuantity (id: any, method: string) {
    return {
        type: CHANGE_QUANTITY,
        data: {
            id,
            method
        }
    }
}

export function payOrder(data: any) {
    return {
        type: PAY_ORDER_REQUEST,
        data
    }
}

export function resetCart() {
    return {
        type: RESET_CART
    }
}