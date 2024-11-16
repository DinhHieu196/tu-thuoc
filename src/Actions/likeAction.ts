import {
    FETCHING_DATA_LIKE, 
    DELETE_DATA_LIKE, 
    ADD_ITEM_LIKE
} from '../Constants/likeConstain';

export function fetchDataLike() {
    return {
        type: FETCHING_DATA_LIKE
    }
}

export function addItemLike (data: string) {
    return {
        type: ADD_ITEM_LIKE,
        data
    }
}

export function deleteItem(id: any) {
    return {
        type: DELETE_DATA_LIKE,
        data: {
            id
        }
    }
}