import React from "react";
import "./order.css";
import { Link } from "react-router-dom";

export default function Order({ orders }) {
  return (
    <div key={orders.id} className="orderContainer">
      {orders.map((i) => (
        <div className="allOrders">
          <img src={i.img} width="100px" height="120px" />
          <h5>{i.name}</h5>
          <h5>{i.price}</h5>
        </div>
      ))}
      <div className="orderBtn2">
        <Link to="/">
          <button className="btn btn-primary">Go To Home</button>
        </Link>
      </div>
    </div>
  );
}
