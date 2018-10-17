

import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const rootReducer = () => {

};

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

export const store = createStoreWithMiddleware(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
