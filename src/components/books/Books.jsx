import "./books.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function Books() {
  const [show, setShow] = useState(false);

  // useState =============================================
  const [allBook, setAllBook] = useState({
    items: [],
    volumeInfo: { categories: "", authors: [] },
  });
  const [nextPage, setNextPage] = useState(0);
  const [authorTitle, setAuthorTitle] = useState("title");
  const [searchBook, setSearchBook] = useState("aa");
  const [searchBookBtn, setSearchBookBtn] = useState("a");
  const [order, setOrder] = useState();
  const [filter, setFilter] = useState();
  const [language, setLanguage] = useState();

  // useEffect ===================================================
  const dispatch = useDispatch();
  const selector = useSelector((i) => {
    return i.search;
  });
  useEffect(() => {
    setSearchBookBtn(selector);
    getBook();
  }, [nextPage, searchBookBtn, selector]);

  // getBook ========================================================
  const getBook = async () => {
    const res = await axios.get(
      "https://www.googleapis.com/books/v1/volumes",

      {
        params: {
          q:
            `${authorTitle == "title" ? searchBookBtn : "random"}+${
              authorTitle == "author" ? searchBookBtn : ""
            }` || "random",

          key: "AIzaSyAJk3lg-DHBlLj-Is3TvlKEcvPkAZgAqco",
          maxResults: 20,
          startIndex: nextPage,
          langRestrict: language,
          orderBy: order,
          filter: filter,
        },
      }
    );

    setAllBook(res.data);
    handleClose();
  };

  // handeler ========================================================
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const addHandeler = (O) => {
    dispatch(addItem(O.volumeInfo.title));
    alert("added to cart");
  };

  const nextHandeler = () => {
    setNextPage((a) => a + 40);
  };

  const searchBookHandel = () => {
    setSearchBookBtn(searchBook);
    console.log(authorTitle);
  };
  // console.log(allBook.items);
  //return ==========================================================
  return (
    <>
      <div className="offcnvasidebar">
        <Button variant="primary" onClick={handleShow}>
          Filter
        </Button>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filter</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="offcanvasForm">
            <label htmlFor="order">Order By:</label>
            <select id="order" onChange={(e) => setOrder(e.target.value)}>
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
            </select>
            <label htmlFor="filter">filter:</label>
            <select id="filtere" onChange={(e) => setFilter(e.target.value)}>
              <option value="partial">partial</option>
              <option value="full">full</option>
              <option value="free-ebooks">free-ebooks</option>
              <option value="paid-ebooks">paid-ebooks</option>
              <option value="ebooks">ebooks</option>

              <option>ebooks</option>

              <option>full</option>
            </select>
            <label htmlFor="language">Language:</label>

            <select id="language" onChange={(e) => setLanguage(e.target.value)}>
              <option value="en">En</option>
              <option value="fr">Fr</option>
            </select>
            <button className="btn btn-primary" onClick={() => getBook()}>
              apply
            </button>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <div className="container20">
        <div className="sidebar">
          <label htmlFor="order">Order By:</label>
          <select id="order" onChange={(e) => setOrder(e.target.value)}>
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
          </select>
          <label htmlFor="filter">filter:</label>
          <select id="filtere" onChange={(e) => setFilter(e.target.value)}>
            <option value="partial">partial</option>
            <option value="full">full</option>
            <option value="free-ebooks">free-ebooks</option>
            <option value="paid-ebooks">paid-ebooks</option>
            <option value="ebooks">ebooks</option>

            <option>ebooks</option>

            <option>full</option>
          </select>
          <label htmlFor="language">Language:</label>

          <select id="language" onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">En</option>
            <option value="fr">Fr</option>
          </select>
          <button onClick={() => getBook()}>apply</button>
        </div>

        <div className="fetchBook">
          {allBook.totalItems !== 0 ? (
            allBook.items.map((i) => <Cards i={i} allBook={allBook} />)
          ) : (
            <h1>No result found</h1>
          )}
        </div>
      </div>
    </>
  );
}
