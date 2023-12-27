import React, { useState } from "react";
import NavbarComp from "../../components/navbarComp/NavbarComp";

import Books from "../../components/books/Books";
import "./search.css";

export default function Search() {
  return (
    <div>
      <div className="container2">
        <div className="bodyPart">
          <Books />
        </div>
      </div>
    </div>
  );
}
