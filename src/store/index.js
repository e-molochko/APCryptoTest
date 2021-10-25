import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistCombineReducers } from 'redux-persist'

import middlewares from './middlewares'
import reducers from './reducers'

const config = {
    key: 'root',
    // blacklist: ['user'],
    storage: AsyncStorage,
}

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const reducer = combineReducers(reducers)
const reducer = persistCombineReducers(config, reducers)

const middlewaresArray = [thunk, ...middlewares]

export const store = createStore(
    reducer,
    {},
    composeEnhancers(applyMiddleware(...middlewaresArray))
)
export const persistor = persistStore(store)
