const Books = require("../models/Books");


const getAllBooks = async (req, res, next) => {
    let books;
    try {
        books = await Books.find();
    } catch (err) {
        console.log(err);
    }

    if (!books) {
        return res.status(404).json({ Message: "No books Found" });
    }

    return res.status(200).json({ books: books });
}

const addBook = async (req, res, next) => {
    const { name, author, description, price, available, image} = req.body;
    let book;
    try {
        book = new Books({
            name,
            author,
            description,
            price,
            available,
            image,
        });
        await book.save();
    } catch (err) {
        console.log(err);
    }
    if (!book) {
        return res.status(500).json({ message: "Unable to Add." });
    }
    return res.status(201).json({ book });
};

const getById = async (req, res, next) => {
    const id = req.params.id;
    let book;
    try {
        book = await Books.findById(id);
    } catch (err) {
        console.log(err);
    }

    if (!book) {
        return res.status(404).json({ Message: "No Book Found" });
    }

    return res.status(200).json({ book: book });
}

const updateBook = async (req, res, next) => {
    const id = req.params.id;
    const { name, author, description, price, available, image} = req.body;
    let book;
    try {
        book = await Books.findByIdAndUpdate(id, {
            name,
            author,
            description,
            price,
            available,
            image,
        });
        book = await book.save();
    }catch(err){
        console.log(err);
    }

    if (!book) {
        return res.status(404).json({ message: "Unable to Update."});
    }

    return res.status(201).json({ book: book });
}

const DeleteBookbyId = async (req, res, next) => {
    const id = req.params.id;
    let book;
    try {
        book = await Books.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }

    if (!book) {
        return res.status(404).json({ Message: "No Book Deleted" });
    }

    return res.status(200).json({message: "Deleted Successfully"});
}

exports.getAllBooks = getAllBooks;
exports.addBook = addBook;
exports.getById = getById;
exports.updateBook = updateBook;
exports.DeleteBookbyId = DeleteBookbyId;