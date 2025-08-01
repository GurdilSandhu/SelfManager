import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Book = (props) => {
  const { _id, name, author, description, price, image } = props.book
  const navigate = useNavigate();
  const handleChange = () => {
    navigate(`/books/${_id}`)
  }
  const handleDelete = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete this book?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5000/books/${_id}`);
    window.location.reload();
   navigate("/books");
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Error deleting book.");
  }
};

  return (
    <div className='book'>
      <img src={image} alt={name} />
      <article>By {author}</article>
      <h3>{name}</h3>
      <p>{description}</p>
      <h2>Rs {price}</h2>
      <button onClick={handleChange}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default Book;