import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./bookDetails.css";
import { Link, useNavigate } from "react-router-dom";
import { addItem } from "../../redux/cartSlice";

export default function BookDetails() {
  const dispatch = useDispatch();
  const book = useSelector((i) => {
    return i.bookdetails;
  });
  const navigate = useNavigate();
  return (
    <div>
      <Link to="/">
        <button className="btn btn-warning " onClick={() => navigate(-1)}>
          Go Back
        </button>
      </Link>
      <div className="bookContainer">
        <img
          src={
            book.volumeInfo.imageLinks
              ? book.volumeInfo.imageLinks.thumbnail
              : "img/no-preview.png"
          }
        />
        <div className="bookInfo">
          <h1>{book.volumeInfo.title}</h1>
          <h4>
            {book.volumeInfo.authors &&
              book.volumeInfo.authors.map((a, b) => <span key={b}>{a}, </span>)}
          </h4>
          <p>page: {book.volumeInfo.pageCount}</p>
          <p>language: {book.volumeInfo.language}</p>
          <p>publisher : {book.volumeInfo.publisher}</p>

          <p>publishedDate : {book.volumeInfo.publishedDate}</p>
          <p> {book.searchInfo.textSnippet}</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch(
                addItem({
                  name: book.volumeInfo.title,
                  catefories: book.volumeInfo.categories,
                  price: book.saleInfo.retailPrice
                    ? book.saleInfo.retailPrice.amount
                    : "255.22",
                  img: book.volumeInfo.imageLinks
                    ? book.volumeInfo.imageLinks.thumbnail
                    : "img/no-preview.png",
                })
              );
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
