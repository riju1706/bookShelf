import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { userDetailsAction } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmail, setGetEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const signInHandeler = (e) => {
    e.preventDefault();
    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        dispatch(
          userDetailsAction({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
          })
        );

        navigate("/");
      })
      .catch((error) => {
        setError("Email or password Incorrect");
      });
  };
  return (
    <>
      <div className="containera">
        <img src="./img/signUp.png" className="loginImg" />
        <Form className="formContainer" onSubmit={signInHandeler}>
          <Col className="colForm">
            <Col className="mb-2">
              <Form.Control
                type="email"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>

            <Col className="mb-2">
              <Form.Control
                placeholder=" Password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </Col>
            <p>{error}</p>

            <Button
              variant="primary"
              size="lg"
              className="w-100 mb-3"
              type="submit"
            >
              Log in
            </Button>
          </Col>
          <h5 style={{ textAlign: "center" }}>
            Create new account.
            <Link to="/signup">
              <Button variant="success"> Sign Up</Button>
            </Link>
          </h5>
        </Form>
      </div>
    </>
  );
}

{
  /* <>
      <center>
        <input
          type="text"
          placeholder="enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={signInHandeler}>Sign In</button>
      </center>
    </> */
}
