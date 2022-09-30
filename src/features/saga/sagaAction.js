import axios from 'axios';
import {takeLatest, put, call} from 'redux-saga/effects'
import {    decreaseItem, removeItem, setDecreaseItem, setFetchData, setRemoveItem } from '../cartSlice';

function* handleFetchData(){
    const usersFetch = async()=>{
      const res =await axios('http://localhost:3004/cart');
      return res.data
  }
    try{
      const data = yield call(usersFetch);
      yield put (setFetchData(data))
    }
    catch(error){
     console.log('something went wrong while fetching data')
    }
  } 


function* handleRemoveData(action){
  const removeItemFunc = async()=>{
    // console.log(value)
    const res =await axios.delete(`http://localhost:3004/cart/${action.payload}`);
    return res.data
}
  try{
    yield call(removeItemFunc);
    yield put (setRemoveItem(action.payload))
  }
  catch(error){
   console.log('something went wrong while deleting data')
  }
}


function* handleDeleteItem (action){
console.log(action.payload)
  const decreaseFunc = async()=>{
    
    // return res.data

  //  const res =  await axios.delete(`http://localhost:3004/cart/${action.payload.id}`)
  //   console.log(res)


  if(action.payload.qty<2){
    // const res =await axios.patch(`http://localhost:3004/cart/${action.payload.id}`,{"price":action.payload.price, "qty": action.paload.qty});
    // return res.data

    const res =await axios.delete(`http://localhost:3004/cart/${action.payload.id}`);
    console.log(res)
    return res.data
  }
  else{
    const payload = { "qty": action.payload.qty}
    const res =await axios.patch(`http://localhost:3004/cart/${action.payload.id}`,payload);
    console.log(payload)
    console.log(res)
    
  }

}
try{
  yield call(decreaseFunc);
  yield put (setDecreaseItem(action.payload.id))
}
catch(error){
 console.log('something went wrong while decreasing item',error)
}}

function* watcherSaga(){
    yield takeLatest('cart/fetchData', handleFetchData)
    yield takeLatest(removeItem, handleRemoveData )
    yield takeLatest(decreaseItem, handleDeleteItem )
      // yield takeLatest('cart/addItem')      
      // yield takeLatest('cart/decreaseItem')
      
  }
  
  export default watcherSaga