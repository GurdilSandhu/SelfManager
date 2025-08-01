import React, { useState } from "react";
import axios from "axios";
import "./AddBook.css";
const BASE_URL = "https://shelfmanager-backend.onrender.com";

const AddBook = () => {
  const [book, setBook] = useState({
    name: "",
    author: "",
    description: "",
    price: "",
    available: true,
    image: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBook({
      ...book,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("${BASE_URL}/books", book);
      alert("Book added successfully!");
      setBook({
        name: "",
        author: "",
        description: "",
        price: "",
        available: true,
        image: ""
      });
    } catch (error) {
      console.error("Failed to add book:", error);
      alert("Error adding book");
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <label>Book Name</label>
        <input type="text" name="name" value={book.name} onChange={handleChange} required />

        <label>Author</label>
        <input type="text" name="author" value={book.author} onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" value={book.description} onChange={handleChange} required />

        <label>Price</label>
        <input type="number" name="price" value={book.price} onChange={handleChange} required />

        <label>Image URL</label>
        <input type="text" name="image" value={book.image} onChange={handleChange} required />

        <div className="checkbox">
          <label htmlFor="available">Available</label>
          <input type="checkbox" name="available" id="available" checked={book.available} onChange={handleChange} />
        </div>

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
