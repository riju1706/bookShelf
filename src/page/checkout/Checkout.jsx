import React from "react";
import "./checkout.css";
import { useDispatch, useSelector } from "react-redux";
import PaymentItem from "../../components/paymentItem/PaymentItem";
import { Link, useNavigate } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { app } from "../../firebase";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { emptyCartAction } from "../../redux/cartSlice";
import { emptyFirebaseOrdersAction } from "../../redux/cartSlice";

export default function Checkout() {
  // const db = getFirestore(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const item = useSelector((i) => {
    return i.cart;
  });
  const user = useSelector((i) => {
    return i.user;
  });
  const firebaseOrders = useSelector((i) => {
    return i.firebaseOrders;
  });

  const cartTotal = useSelector((i) => {
    const aa = i.cart.length !== 0 && i.cart.map((i) => i.price);

    const reduce = i.cart.length !== 0 && aa.reduce((a, c) => a + c);
    return reduce;
  });

  const paymentHandeler = () => {
    user.uid ? navigate("/orders") : navigate("/login");

    function writeUserData(userId) {
      const db = getDatabase(app);
      set(ref(db, "users/" + userId), {
        orders: [...firebaseOrders, ...item],
      })
        .then((i) => alert("successfully purchased"))
        .catch((err) => console.log(err));
    }
    writeUserData(user.uid);
    dispatch(emptyCartAction());

    navigate("/orders");
  };

  return (
    <>
      <div className="allContainer">
        <div className="heading">
          <p className="titleContiner">Book Name</p>
          <p className="priceContainer">Price</p>
          <p className="quantityContainer">Qunatity</p>
        </div>
        <PaymentItem item={item} />
        <hr style={{ width: "70%", color: "black", height: "5px" }} />
        <div className="heading">
          <p className="titleContiner">Total Price: </p>
          <p className="priceContainer">{cartTotal}</p>
        </div>

        <button className="btn btn-primary" onClick={paymentHandeler}>
          procced to Payment
        </button>
      </div>
    </>
  );
}
