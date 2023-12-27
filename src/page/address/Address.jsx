import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./address.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Address() {
  const navigate = useNavigate();
  const initialState = {
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  };

  const validationData = Yup.object({
    name: Yup.string().min(3).max(10).required("enter your valid name"),
    phone: Yup.string()
      .min(10)
      .max(10)
      .required("mobile number should be 10 digit"),
    address: Yup.string().min(3).max(35).required("enter your valid Address"),

    city: Yup.string().min(3).max(10).required("enter your valid city"),

    state: Yup.string().min(3).max(10).required("enter your valid state"),
    zip: Yup.string().min(6).max(25).required("Enter valid zip code"),
  });

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: initialState,
    validationSchema: validationData,
    onSubmit: (values) => {
      // setMessage("");
      navigate("/checkout");
    },
  });
  return (
    <div className="adressContainer">
      <h2>Add delivery address</h2>
      <form className="addressForm" onSubmit={handleSubmit}>
        <label htmlFor="Country">Country:</label>
        <select id="country">
          <option>India</option>
          <option>Others</option>
        </select>
        <label htmlFor="name">Full Name:</label>
        <input
          onChange={handleChange}
          name="name"
          value={values.email}
          type="text"
          id="name"
        />
        {errors.name ? errors.name : ""}
        <label htmlFor="phone">Phone No:</label>
        <input
          type="number"
          id="phone"
          onChange={handleChange}
          name="phone"
          value={values.email}
        />
        {errors.phone ? errors.phone : ""}

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          onChange={handleChange}
          name="address"
          value={values.email}
        />
        {errors.address ? errors.address : ""}

        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          onChange={handleChange}
          name="city"
          value={values.email}
        />
        {errors.city ? errors.city : ""}

        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          onChange={handleChange}
          name="state"
          value={values.email}
        />
        {errors.state ? errors.state : ""}

        <label htmlFor="zip">Zip:</label>
        <input
          type="number"
          id="zip"
          onChange={handleChange}
          name="zip"
          value={values.email}
        />
        {errors.zip ? errors.zip : ""}

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
