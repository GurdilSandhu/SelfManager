import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const BASE_URL = "https://shelfmanager-backend.onrender.com";

const BookDetail = () => {
  const [book, setBook] = useState({
    name: "",
    author: "",
    description: "",
    price: "",
    available: true,
    image: ""
  });

  const id = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/books/${id}`);
        setBook(res.data.book);
      } catch (error) {
        console.error("Failed to fetch book:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/books/${id}`, book);
      alert("Book updated successfully!");
      navigate("/books");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="add-book-container">
      <h2>Update Book</h2>
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
          <input
            type="checkbox"
            name="available"
            id="available"
            checked={book.available}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default BookDetail;
