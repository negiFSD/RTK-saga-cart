import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './features/cartSlice'
import createSagaMiddleware from 'redux-saga'
import watcherSaga from "./features/saga/sagaAction";


const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
    reducer:{
        cart: cartReducer,
        },
    middleware:()=>[sagaMiddleware]
})
sagaMiddleware.run(watcherSaga)
export default store

