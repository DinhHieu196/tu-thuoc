import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware();
import rootReducer from './reducers'

import homepageSaga from '../Sagas/homepageSaga';
import detailsPageSaga from '../Sagas/detailsPageSaga';
import categoryPageSaga from '../Sagas/categoryPageSaga';
// import menuPageSaga from '../Sagas/menuPageSaga';
import userPageSaga from '../Sagas/userPageSaga';
import cartPageSaga from '../Sagas/cartPageSaga';
import likeSaga from '../Sagas/likeSaga';
import notificationPageSaga from '../Sagas/notificationPageSaga';
import ordersPageSaga from '../Sagas/ordersPageSaga';
export default function configureStore() {
    const middlewares = [
        sagaMiddleware,
    ];

    const enhancers = [
        applyMiddleware(...middlewares),
    ];
    const store = createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(
                sagaMiddleware,
                thunkMiddleware
            )
        )
    );

    sagaMiddleware.run(homepageSaga);
    sagaMiddleware.run(detailsPageSaga);
    sagaMiddleware.run(categoryPageSaga);
    // sagaMiddleware.run(menuPageSaga);
    sagaMiddleware.run(userPageSaga);
    sagaMiddleware.run(cartPageSaga);
    sagaMiddleware.run(likeSaga);
    sagaMiddleware.run(notificationPageSaga);
    sagaMiddleware.run(ordersPageSaga);
    // @ts-ignore
    store.runSaga = sagaMiddleware.run;
    return store
}

