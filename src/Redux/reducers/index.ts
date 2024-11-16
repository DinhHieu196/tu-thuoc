import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    homepage: require('../../Reducers/homepageReducer').default,
    detailpage: require('../../Reducers/detailReducer').default,
    categoryPage: require('../../Reducers/categoryReducer').default,
    // menuPage: require('../../Reducers/menuPageReducer').default,
    userPage: require('../../Reducers/userPageReducer').default,
    cartPage: require('../../Reducers/cartReducer').default,
    likeProduct: require('../../Reducers/likeReducer').default,
    notificationPage: require('../../Reducers/notificationPageReducer').default,
    ordersPage: require('../../Reducers/ordersReducer').default
});

export default rootReducer;
