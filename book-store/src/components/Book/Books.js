import React, { useEffect, useState } from 'react'
import './Book.css'
import axios from 'axios';
import Book from './Book';

const BASE_URL = "https://shelfmanager-backend.onrender.com";

const URL = "${BASE_URL}/books"

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data)
}

const Books = () => {
  const [books, setBooks] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setBooks(data.books));
  }, [])
  console.log(books);
  return <div className='books-container'>
    <ul>
      {books && books.map((book, i) => (
        <div className='book' key={i}>
          <Book book={book}/>
        </div>
      ))}
    </ul>
  </div>
}

export default Books;
