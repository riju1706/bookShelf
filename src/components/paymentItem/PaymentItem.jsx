import React from "react";
import "./paymentItem.css";
import { useDispatch, useSelector } from "react-redux";
import { removeOneAction } from "../../redux/cartSlice";

export default function PaymentItem({ item, button }) {
  const dispatch = useDispatch();

  const cart = useSelector((i) => {
    return i.cart;
  });
  const removeHandeler = (i) => {
    console.log("ok");
    console.log(cart);
    console.log(i);
    dispatch(removeOneAction(i.id));
  };
  return (
    <>
      {item.map((i) => (
        <div key={i.id} className="container10">
          <img src={i.img} width="80px" height="100px" />
          <p className="titleContiner">{i.name}</p>
          <p className="priceContainer">{i.price}</p>
          <p className="quantityContainer">1</p>

          {button && (
            <button
              className="btn btn-warning h-50"
              onClick={() => removeHandeler(i)}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </>
  );
}
