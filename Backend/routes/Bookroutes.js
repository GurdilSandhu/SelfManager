const express = require('express');
const router = express.Router();
const Books = require("../models/Books");
const BooksController = require("../controllers/Books-controller");

router.get("/", BooksController.getAllBooks);
router.post("/", BooksController.addBook);
router.get("/:id", BooksController.getById);
router.put("/:id", BooksController.updateBook);
router.delete("/:id", BooksController.DeleteBookbyId);

module.exports = router;