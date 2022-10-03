import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  testCart: [],
  error: 2,
  totalProduct: 0,
  totalCartItems: 0,
  totalAmount: 0,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //-------------saga actions--------------

    // to fetch items
    fetchData: (state) => {
      state.loading = true;
    },

    setFetchData: (state, action) => {
      state.cart = action.payload;
      state.loading = false;
    },

    // to remove items
    removeItem: () => {
      console.log("item remove intitiated");
    },
    setRemoveItem: (state, action) => {
      console.log(action.payload);
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    // to decrease item
    decreaseItem: ()=>{
      console.log('decrease item initiated')

    },
    setDecreaseItem:(state, action)=>{
      console.log('decreasing item')
      const cartItem = state.cart.find((item) => item.id === action.payload);
      if (cartItem.qty === 1) {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      } else cartItem.qty = cartItem.qty - 1;
      cartItem.total = cartItem.qty * cartItem.price;
    },

    //
    
    



    //-------------local actions--------------
    testactionOne:(state, action)=>{
      console.log(action.payload)
      
    },

    clearCart: (state) => {
      state.cart = [];
    },
    increase: (state, action) => {
      const cartItem = state.cart.find((item) => item.id === action.payload);
      // console.log(JSON.parse(JSON.stringify(cartItem)))
      cartItem.qty = cartItem.qty + 1;
      cartItem.total = cartItem.price * cartItem.qty;
    },
    decrease: (state, action) => {
      const cartItem = state.cart.find((item) => item.id === action.payload);
      if (cartItem.qty === 1) {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      } else cartItem.qty = cartItem.qty - 1;
      cartItem.total = cartItem.qty * cartItem.price;
    },
    remove: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    calculateTotals: (state) => {
      state.totalProduct = state.cart.length;
      let items = 0;
      let amounts = 0;
      state.cart.forEach((item) => {
        items += item.qty;
        amounts += item.qty * item.price;
      });
      state.totalCartItems = items;
      state.totalAmount = amounts;
    },
  },
});

export const {
  clearCart,
  increase,
  decrease,
  remove,
  calculateTotals,
  fetchData,
  setFetchData,
  fetchError,
  removeItem,
  setRemoveItem,
  decreaseItem,
  setDecreaseItem,
  testactionOne
} = cartSlice.actions;
export default cartSlice.reducer;
