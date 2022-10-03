import React from "react";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import {removeItem, decreaseItem, increaseItem } from "../features/cartSlice";
import { useDispatch } from "react-redux";


function SingleItems({title,price, total, img,qty, id, totalDisplayValue}) {
const dispatch =  useDispatch()
// console.log(totalDisplayValue)
  return (
    <div className="s-container">
      <img
        alt="sdf"
        src={img}
      ></img>
      <span className="s-values"><p>{title}</p> </span>
      

      <span className="s-values"><p>color</p> </span>
      

      <span className="s-values">  <div>
        {qty}
        <div>
        <span className="s-minus">
            <AiFillMinusCircle fontSize="21px" onClick={()=>dispatch(decreaseItem({id:id, qty:qty}))} />
          </span>
          <span className="s-plus">
            <IoIosAddCircle  fontSize="22px" onClick={()=>dispatch(increaseItem({id:id, qty:qty}))}/>
          </span>
          
        </div>
      </div>
      </span>
     
      {/* <p>sdf</p> */}

      <span className="s-values"> 
      <p>Rs {totalDisplayValue.toFixed(2)}</p>
      </span>
      
      <span className="s-cancel">
        <MdCancel fontSize="22px" onClick={()=>dispatch(removeItem(id))} />
      </span>
    </div>
  );
}
export default SingleItems;
