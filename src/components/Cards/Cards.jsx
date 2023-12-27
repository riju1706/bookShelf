import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { addItem, bookDetailsAction } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./card.css";

function Cards({ i, allBook }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addCart, setAddCart] = useState(false);

  const bookDetailsHandeler = () => {
    dispatch(bookDetailsAction(i));
    navigate("/bookDetails");
  };

  const addToCartHandeler = () => {
    setAddCart(true);
    dispatch(
      addItem({
        id: i.id,
        name: i.volumeInfo.title,
        catefories: i.volumeInfo.categories ? i.volumeInfo.categories : null,
        price: i.saleInfo.retailPrice ? i.saleInfo.retailPrice.amount : 255.22,
        img: i.volumeInfo.imageLinks
          ? i.volumeInfo.imageLinks.thumbnail
          : "img/no-preview.png",
      })
    );
    setTimeout(() => {
      setAddCart(false);
    }, 2000);
  };
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={
          i.volumeInfo.imageLinks
            ? i.volumeInfo.imageLinks.thumbnail
            : "img/no-preview.png"
        }
        width="550px"
        height="250px"
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{i.volumeInfo.title}</Card.Title>
        <Card.Text>
          <b>{i.volumeInfo.categories}</b>
        </Card.Text>
        <p>
          {i.volumeInfo.authors &&
            i.volumeInfo.authors.map((a, b) => <span key={b}>{a}, </span>)}
        </p>
        <p>language: {i.volumeInfo.language}</p>
        <a className="moreDetails" onClick={bookDetailsHandeler}>
          more details...
        </a>

        <Button
          variant="primary"
          className="w-100 cardButton"
          onClick={() => {
            addToCartHandeler();
          }}
        >
          Add to cart {addCart && <box-icon name="check-circle"></box-icon>}
          {/* {addCart && "added"} */}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Cards;
