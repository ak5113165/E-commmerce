import React from "react";
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const products = useSelector((state) => state.cart.products);
  // console.log(products);
  const dispatch = useDispatch();

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  // const stripePromise = loadStripe(
  //   "pk_test_51O4TIbSD5qFJgD57YU3P0kF4DxCdvu6bNfkSippxohFNlAp11MaszRU0cbDwCEGisaP3yJLcQcHcq47JF9wsGbsF00x2VNGtdW"
  // );
  // console.log(stripePromise);
  const makePayment = async()=>{
    const stripe = await loadStripe("pk_test_51O4TIbSD5qFJgD57YU3P0kF4DxCdvu6bNfkSippxohFNlAp11MaszRU0cbDwCEGisaP3yJLcQcHcq47JF9wsGbsF00x2VNGtdW");

    const body = {
        products,
    }
    const headers = {
        "Content-Type":"application/json"
    }
    const response = await fetch("http://localhost:3001/auth/order",{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
        sessionId:session.id
    });
    
    if(result.error){
        console.log(result.error);
    }
}
  return (
    <div className="cart">
      <h1>Products in your cart</h1>
      {products?.map((item) => (
        <div className="item" key={item.id}>
          <img src={item.img} alt="" />
          <div className="details">
            <h1>{item.title}</h1>
            <div className="price">
              {item.quantity*item.price}$
            </div>
          </div>
          <DeleteOutlinedIcon
            className="delete"
            onClick={() => dispatch(removeItem(item.id))}
          />
        </div>
      ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>{totalPrice()}$</span>
      </div>
      <button onClick={makePayment}>PROCEED TO CHECKOUT</button>
      <span className="reset"onClick={() => dispatch(resetCart())}>Reset Cart</span>
    </div>
  );
};

export default Cart;
