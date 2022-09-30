import React, { useEffect } from "react";
import SingleItems from "./SingleItems";
// import cartItems from "../cartItem";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals, clearCart, fetchData, } from "../features/cartSlice";

function FirstCart() {
 const cartItems =  useSelector((store)=>store.cart)
 const{totalProduct, totalCartItems, totalAmount} = useSelector((store)=>store.cart)
 const dispatch =  useDispatch()

 useEffect(()=>{
dispatch(fetchData())
 },[dispatch,totalProduct ])
useEffect(()=>{
  dispatch( calculateTotals())
},[dispatch,cartItems.cart])
 

 return (
   <div className="firstcart-container">
   {/* {cartItems.cart[0].total ===undefined ?  console.log(cartItems.cart[0].price):console.log(cartItems.cart[0].total) } */}
      <div className="f-cart-items">
        {" "}
        <div className="f-titles">Cart Items</div>
        {cartItems.cart.map((item) => (
          <SingleItems
            key={item.id}
            title={item.title}
            price={item.price}
            img={item.img}
            amount={item.amount}
            qty={item.qty}
            id={item.id}
            total={item.total}
            totalDisplayValue = {item.total ===undefined? item.price:item.total}
          />
        ))}
        {cartItems.cart.length<1 && <div> No Item in the cart</div>}
        {cartItems.cart.length>0 && <button className="f-button" onClick={()=>dispatch(clearCart())}>Clear Cart</button>}
          {/* <button onClick={()=>(dispatch(fetchData()))}>fetch item</button>
          <button onClick={()=>(dispatch(removeItem('3333')))}>delete item</button> */}

      </div>
      <div className="f-cart-calculation">
        <div className="f-titles">Cart summary</div>
          <div className="f-cart-summary">Total Products : {totalProduct}</div>
          <div className="f-cart-summary">Total Cart Items:{totalCartItems}</div>
          <div className="f-cart-summary">Total Amounts: {totalAmount.toFixed(2)}</div>  
      </div>
    </div>  
  );
} 

export default FirstCart;
