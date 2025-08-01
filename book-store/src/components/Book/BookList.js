import React from "react";
import Book from "./Book";


const BookList = ({ books }) => {
  return (
    <div className="books-container">
      {books.map((book) => (
        <Book key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
