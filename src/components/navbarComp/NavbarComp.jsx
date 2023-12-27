import "./navbarComp.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import SeatchItem from "../searchItem/SeatchItem";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { searchAddItem } from "../../redux/cartSlice";
import { authorTitleAction } from "../../redux/cartSlice";
import "boxicons";
// import { ShoppingCartOutlinedIcon } from "@mui/icons-material";

function NavbarComp() {
  // useState =====================================

  const [search, setSearch] = useState(false);
  const [searchHelp, setSearchHelp] = useState([
    { volumeInfo: { authors: [], title: "" } },
  ]);
  const [searchBook, setSearchBook] = useState("");
  const [searchValue, setSearchValue] = useState("");

  // ====================================================
  const refOne = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for out click ========================================

  useEffect(() => {
    const handelClickOutside = (e) => {
      if (!refOne.current.contains(e.target)) {
        setSearch(false);
      } else {
        setSearch(true);
      }
    };
    document.addEventListener("click", handelClickOutside, false);
  }, []);

  //redux =========================================================
  const authorTitle = useSelector((i) => {
    return i.authorTitle;
  });
  const cartItem = useSelector((i) => {
    return i.cart;
  });
  const user = useSelector((i) => {
    return i.user;
  });

  // book fetching function =========================================
  const fetchBookHelp = async (value) => {
    const res = await axios.get(
      "https://www.googleapis.com/books/v1/volumes",

      {
        params: {
          q:
            `${authorTitle == "title" ? value : "+"}${
              authorTitle == "author" ? value : ""
            }` || "random",

          key: "AIzaSyAJk3lg-DHBlLj-Is3TvlKEcvPkAZgAqco",
          maxResults: 8,
        },
      }
    );

    setSearchHelp(res.data.items);
  };
  const fetchBookClick = async (value) => {
    const res = await axios.get(
      "https://www.googleapis.com/books/v1/volumes",

      {
        params: {
          q:
            `${authorTitle == "title" ? value : "+"}${
              authorTitle == "author" ? value : ""
            }` || "random",

          key: "AIzaSyAJk3lg-DHBlLj-Is3TvlKEcvPkAZgAqco",
          maxResults: 8,
        },
      }
    );

    dispatch(searchAddItem(value));
  };
  // for logout ================================================
  const logoutHandeler = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/login");
        window.location.reload();
      })
      .catch((error) => {
        // An error happened.
      });
  };
  // hadeler =========================================

  const myOrderHandeler = () => {
    user.uid ? navigate("/orders") : navigate("/login");
  };
  // return=========================================================
  return (
    <>
      <Navbar expand="lg" className="bg-info ">
        <Container fluid>
          <Navbar.Brand onClick={() => navigate("/")}>
            <img className="logoImg" src="./img/logo.png" width="180px" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll></Nav>
            <Form className="d-flex navForm">
              <label htmlFor="aurhor">Author</label>
              <input
                type="radio"
                name="search"
                id="author"
                value="author"
                // onChange={(e) => setAuthorTitle("author")}
                onChange={() => dispatch(authorTitleAction("author"))}
              />
              <label htmlFor="title">Title</label>
              <input
                type="radio"
                name="search"
                id="title"
                value="title"
                // onChange={(e) => setAuthorTitle("title")}
                onChange={() => dispatch(authorTitleAction("title"))}
                defaultChecked
              />
              <div ref={refOne}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {
                    fetchBookHelp(e.target.value);
                    setSearchValue(e.target.value);
                  }}
                />
                <div className="searchList">
                  {search &&
                    searchHelp.map((i) => (
                      <div
                        onClick={() => {
                          dispatch(searchAddItem(i.volumeInfo.title));
                          navigate("/search");
                          setSearch(false);
                        }}
                        key={i.id}
                        className="searchListItem"
                      >
                        <SeatchItem i={i} authorTitle={authorTitle} />
                      </div>
                    ))}
                </div>
              </div>

              <Button
                variant="outline-success bg-warning"
                style={{ color: "#000" }}
                onClick={() => {
                  fetchBookClick(searchValue);
                  navigate("/search");
                }}
              >
                Search
              </Button>
            </Form>
            <Link to="./payment" className="cart" className="navlink">
              <box-icon name="cart-alt"></box-icon>

              <p className="cartNum">{cartItem.length}</p>
            </Link>

            {user.name ? (
              <NavDropdown
                title={user.name}
                id="navbarScrollingDropdown"
                style={{ marginRight: "120px" }}
                className="navbutton btn btn-warning"
              >
                <NavDropdown.Item>
                  <Button
                    variant="outline-success bg-warning"
                    style={{ color: "#000" }}
                    onClick={logoutHandeler}
                    ref={refOne}
                  >
                    Logout
                  </Button>
                </NavDropdown.Item>
                <NavDropdown.Divider />>
                <NavDropdown.Item onClick={myOrderHandeler}>
                  My order
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link to="/login" className="navbutton">
                <button className="btn btn-warning">Login</button>
              </Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComp;
