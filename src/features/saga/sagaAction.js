import axios from "axios";
import { takeLatest, put, call } from "redux-saga/effects";
import {
  decreaseItem,
  increaseItem,
  removeItem,
  setDecreaseItem,
  setFetchData,
  setIncreaseItem,
  setRemoveItem,
} from "../cartSlice";



//------------------- fetch item for the first time-----------------------

function* handleFetchData() {
  const usersFetch = async () => {
    const res = await axios("http://localhost:3004/cart");
    return res.data;
  };
  try {
    const data = yield call(usersFetch);
    yield put(setFetchData(data));
  } catch (error) {
    console.log("something went wrong while fetching data", error.message);
  }
}

//------------------------ deleting items ------------------------------------

function* handleRemoveData(action) {
  const removeItemFunc = async () => {
    const res = await axios.delete(
      `http://localhost:3004/cart/${action.payload}`
    );
    return res.data;
  };
  try {
    yield call(removeItemFunc);
    yield put(setRemoveItem(action.payload));
  } catch (error) {
    console.log("something went wrong while deleting data");
  }
}

// ------------------------Decreasing items -------------------------------------

function* handleDecreaseItem(action) {
  const decreaseFunc = async () => {
    if (action.payload.qty < 2) {
      const res = await axios.delete(
        `http://localhost:3004/cart/${action.payload.id}`
      );
      console.log(res);
      // return res.data;
    } else {
      const payload = { qty: action.payload.qty -1};
      console.log("making decrease request");
      const res = await axios.patch(
        `http://localhost:3004/cart/${action.payload.id}`,
        payload
        );
        // return res.data;
        console.log(res.data)
      }
    };
    try {
      yield put(setDecreaseItem(action.payload.id));
      yield call(decreaseFunc);
  } catch (error) {
    console.log("something went wrong while decreasing item", error);
  }
}

// ------------------------Increasing items -------------------------------------
function* handleIncreaseItem(action){
  const increaseFunc = async () => {
    const payload = { qty: action.payload.qty +1};
    const res = await axios.patch(
      `http://localhost:3004/cart/${action.payload.id}`,
      payload
      );
    return res.data;
  };
  try {
    const data = yield call(increaseFunc);
    yield put(setIncreaseItem(data));

  } catch (error) {
    console.log("something went wrong while fetching data", error.message);
  }
}

//-------------------------saga watcher function-------------------------------

function* watcherSaga() {
  yield takeLatest("cart/fetchData", handleFetchData);
  yield takeLatest(removeItem, handleRemoveData);
  yield takeLatest(decreaseItem, handleDecreaseItem);
  yield takeLatest(increaseItem, handleIncreaseItem)
}

export default watcherSaga;
