import logo from "./logo.jpg";
import "./App.css";
import Home from "./page/home/Home";
import Login from "./page/login/Login";
import SignUp from "./page/signUp/SignUp";
import { Route, Routes } from "react-router-dom";
import Payment from "./page/payment/Payment";
import NavbarComp from "./components/navbarComp/NavbarComp";

import "bootstrap/dist/css/bootstrap.min.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase";
import Search from "./page/Search/Search";
import Footer from "./components/footer/Footer";
import Address from "./page/address/Address";
import Orders from "./page/orders/Orders";
import Checkout from "./page/checkout/Checkout";
import BookDetails from "./page/bookDetails/BookDetails";
import Novel from "./components/allCatagory/novel/Novel";
import Fiction from "./components/allCatagory/fiction/Fiction";
import Adventure from "./components/allCatagory/adventure/Adventure";
import Comic from "./components/allCatagory/comic/Comic";
import Mystery from "./components/allCatagory/Mystery/Mystery";
import Fantasy from "./components/allCatagory/fantasy/Fantasy";
import Historical from "./components/allCatagory/historical/Historical";

function App() {
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
    } else {
    }
  });
  return (
    <>
      <NavbarComp />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Novel />} />
          <Route path="fiction" element={<Fiction />} />
          <Route path="adventure" element={<Adventure />} />
          <Route path="comic" element={<Comic />} />
          <Route path="mystery" element={<Mystery />} />
          <Route path="fantasy" element={<Fantasy />} />
          <Route path="historical" element={<Historical />} />
        </Route>
        <Route path="cart" element={<Payment />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="search" element={<Search />} />
        <Route path="payment" element={<Payment />} />
        <Route path="address" element={<Address />} />
        <Route path="orders" element={<Orders />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="bookDetails" element={<BookDetails />} />
      </Routes>
    </>
  );
}

export default App;
