import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../../Cards/Cards";

export default function Novel() {
  // useState =============================================
  const [allBook, setAllBook] = useState({
    items: [],
    volumeInfo: { categories: "", authors: [] },
  });
  const [nextPage, setNextPage] = useState(0);

  // getBook ========================================================
  const getBook = async () => {
    const res = await axios.get(
      "https://www.googleapis.com/books/v1/volumes",

      {
        params: {
          // q: "a+inauthor:adfgdg",
          q: "novel",

          key: "AIzaSyAJk3lg-DHBlLj-Is3TvlKEcvPkAZgAqco",
          maxResults: 20,
          startIndex: nextPage,
        },
      }
    );

    setAllBook(res.data);
  };
  useEffect(() => {
    getBook();
  }, [nextPage]);
  return (
    <div className="fetchContent">
      <h3>{allBook.items.length == 0 && "loading...."}</h3>

      <div className="fetchBook" style={{ minHeight: "50rem" }}>
        {allBook.totalItems !== 0 ? (
          allBook.items.map((i) => <Cards key={i.id} i={i} allBook={allBook} />)
        ) : (
          <h1>No result found</h1>
        )}
      </div>
      <div className="fetchButton">
        <button onClick={() => setNextPage((a) => a - 40)}>Prev</button>
        <span>page: {nextPage / 40 + 1}</span>
        <button onClick={() => setNextPage((a) => a + 40)}>Next</button>
      </div>
    </div>
  );
}
