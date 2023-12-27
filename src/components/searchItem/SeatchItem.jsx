import React from "react";

export default function SeatchItem({ i, authorTitle }) {
  return (
    <>
      <div>
        {authorTitle == "title" ? i.volumeInfo.title : i.volumeInfo.authors}
      </div>
    </>
  );
}
