import React, { useState } from "react";
import "./signUp.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../../firebase";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [message, setMessage] = useState("");

  const db = getFirestore(app);
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationData = Yup.object({
    name: Yup.string().min(3).max(10).required("enter your valid name"),
    email: Yup.string().email().required("please enter valid email"),
    password: Yup.string()
      .min(6)
      .max(20)
      .required("please enter your new password"),
    confirmPassword: Yup.string()
      .required("Please re-type your password")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: initialState,
    validationSchema: validationData,
    onSubmit: (values) => {
      setMessage("");
      function updateUserData() {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
          displayName: values.name,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then((user) => {})
          .catch((error) => {
            console.log(error);
          });
      }

      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((result) => {
          updateUserData();

          setMessage("Account Your account has been created successfully");
        })
        .catch(() => setMessage("sign up failed!!"));
    },
  });

  return (
    <>
      <div className="containera">
        <img className="loginImg" src="./img/signUp.png" />
        <Form className="formContainer" onSubmit={handleSubmit}>
          <Col className="colForm">
            <Col className="mb-2">
              <Form.Control
                placeholder="Name"
                onChange={handleChange}
                name="name"
                value={values.name}
              />
            </Col>
            <p>{errors.name ? errors.name : ""}</p>
            <Col className="mb-2">
              <Form.Control
                type="email"
                placeholder="email"
                onChange={handleChange}
                name="email"
                value={values.email}
              />
              {errors.email ? errors.email : ""}
            </Col>

            <Col className="mb-2">
              <Form.Control
                placeholder="New Password"
                onChange={handleChange}
                name="password"
                value={values.password}
                type="password"
              />
              <p>{errors.password ? errors.password : ""}</p>
            </Col>

            <Col className="mb-3">
              <Form.Control
                placeholder="Confirm Password"
                onChange={handleChange}
                name="confirmPassword"
                value={values.confirmPassword}
                type="password"
              />
              <p>{errors.confirmPassword ? errors.confirmPassword : ""}</p>
            </Col>
            <p>{message}</p>

            <Button
              variant="primary"
              size="lg"
              className="w-100 mb-3"
              type="submit"
            >
              Sign Up
            </Button>
          </Col>
          <h5 style={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/login">
              <Button variant="success">Log in</Button>
            </Link>
          </h5>
        </Form>
      </div>
    </>
  );
}
