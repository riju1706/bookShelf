import React from "react";
import { useSelector } from "react-redux";
import PaymentItem from "../../components/paymentItem/PaymentItem";
import "./payment.css";
import NavbarComp from "../../components/navbarComp/NavbarComp";
import { Link, useNavigate } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();

  const item = useSelector((i) => {
    return i.cart;
  });
  const user = useSelector((i) => {
    return i.user;
  });

  const addressHandeler = () => {
    user.uid ? navigate("/address") : navigate("/login");
  };

  const cartTotal = useSelector((i) => {
    const aa = i.cart.length !== 0 && i.cart.map((i) => i.price);

    const reduce = i.cart.length !== 0 && aa.reduce((a, c) => a + c);
    return reduce;
  });

  return (
    <>
      <div className="allContainer">
        <div className="heading">
          <h5 className="titleContiner">Book</h5>
          <h5 className="titleContiner">Book Name</h5>
          <h5 className="priceContainer">Price</h5>
          <h5 className="quantityContainer">Qunatity</h5>
        </div>
        <PaymentItem item={item} button={true} />
        <hr style={{ width: "70%", color: "black", height: "5px" }} />
        <div className="heading">
          <p className="titleContiner">Total</p>
          <p className="priceContainer">Total Price: {cartTotal}</p>
        </div>

        <button className="btn btn-primary" onClick={addressHandeler}>
          Add Address
        </button>
      </div>
    </>
  );
}
