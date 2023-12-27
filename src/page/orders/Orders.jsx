import React, { useEffect, useState } from "react";
import "./orders.css";
import Order from "../../components/order/Order";
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, child, get } from "firebase/database";
import { app } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { firebaseOrdersAction } from "../../redux/cartSlice";

export default function Orders() {
  const [firebaseOrders, setFirebaseOrders] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((i) => {
    return i.user;
  });

  useEffect(() => {
    const dbRef = ref(getDatabase(app));

    get(child(dbRef, `users/${user.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setFirebaseOrders(snapshot.val().orders);
          dispatch(firebaseOrdersAction(snapshot.val().orders));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="ordersContainer">
      <h1>My orders:</h1>

      <Order orders={firebaseOrders} />
    </div>
  );
}
