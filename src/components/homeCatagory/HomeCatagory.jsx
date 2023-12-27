import React, { useState } from "react";
import "./homeCatagory.css";

import Novel from "../allCatagory/novel/Novel";
import Fiction from "../allCatagory/fiction/Fiction";
import Adventure from "../allCatagory/adventure/Adventure";
import Comic from "../allCatagory/comic/Comic";
import Mystery from "../allCatagory/Mystery/Mystery";
import Fantasy from "../allCatagory/fantasy/Fantasy";
import Historical from "../allCatagory/historical/Historical";
import { Link, NavLink, Outlet } from "react-router-dom";

export default function HomeCatagory() {
  return (
    <div>
      <div className="fullRow">
        <div className="halfRow1">
          <NavLink to="/" className="navLink">
            <h5 className="column">Novel</h5>
          </NavLink>
          <NavLink to="fiction" className="navLink">
            <h5 className="column">Fiction</h5>.
          </NavLink>
          <NavLink to="adventure" className="navLink">
            <h5 className="column">Adventure</h5>
          </NavLink>
          <NavLink to="comic" className="navLink">
            <h5 className="column">Comic</h5>
          </NavLink>
        </div>
        <div className="halfRow2">
          <NavLink to="mystery" className="navLink">
            <h5 className="column">Mystery</h5>
          </NavLink>
          <NavLink to="fantasy" className="navLink">
            <h5 className="column">Fantasy</h5>
          </NavLink>
          <NavLink to="historical" className="navLink">
            <h5 className="column">Historical</h5>
          </NavLink>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
