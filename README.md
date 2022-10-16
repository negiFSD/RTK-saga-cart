1)first of all install redux toolkit
    

2) Setup redux toolkit store
    import { configureStore } from '@reduxjs/toolkit';
    export const store = configureStore({
        reducer: {},
        });

3) wrap all component inside store using provider

4) Wrap components inside scope of store

5) create slice >> initalstate  >>reducer >> export cont{...actions} = cartSlice.actions;
    export default cartSlice.reducer


6) use global state and dispatched action in UI



--------------------------------------------------------------------------

* inside store
     import createSagaMiddleware, 
     import watcherSaga from saga file
    const sagaMiddleware = createSagaMiddleware()
    middleware=()=>[sagaMiddleware]
    sagaMiddleware.run(watherSaga)

* create sagaAction file
    import {takeLatest, put, call}, axios and all required action from slice

    function* watcherSaga(){
        yield takeLatest(fetchData,  handleFetchData)
    }



Redux Saga is a middleware library used to allow a Redux store to interact with resources outside itself asynchronously.

https://blog.logrocket.com/smarter-redux-redux-toolkit/    *****

https://blog.slashgear.dev/react-redux-pitfalls-and-best-pratices/  
https://lo-victoria.com/introduction-to-redux-toolkit-for-beginners