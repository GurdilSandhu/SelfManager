const Books = require("../models/Books");

const getAllBooks = async (req, res, next) => {
    const { search, sortBy, order = "asc" } = req.query;

    let filter = {};
    if (search) {
        filter = {
            $or: [
                { name: { $regex: search, $options: "i" } },
                { author: { $regex: search, $options: "i" } }
            ]
        };
    }

    const sortOptions = {};
    if (sortBy) {
        sortOptions[sortBy] = order === "desc" ? -1 : 1;
    }

    let books;
    try {
        books = await Books.find(filter).sort(sortOptions);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error fetching books", error: err.message });
    }

    if (!books || books.length === 0) {
        return res.status(404).json({ message: "No books found" });
    }

    return res.status(200).json({ books });
};

const addBook = async (req, res, next) => {
    const { name, author, description, price, available, image } = req.body;
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
        return res.status(500).json({ message: "Unable to add book." });
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
        return res.status(404).json({ message: "No book found" });
    }

    return res.status(200).json({ book });
};

const updateBook = async (req, res, next) => {
    const id = req.params.id;
    const { name, author, description, price, available, image } = req.body;
    let book;
    try {
        book = await Books.findByIdAndUpdate(id, {
            name,
            author,
            description,
            price,
            available,
            image,
        }, { new: true });
    } catch (err) {
        console.log(err);
    }

    if (!book) {
        return res.status(404).json({ message: "Unable to update book." });
    }

    return res.status(200).json({ book });
};

const DeleteBookbyId = async (req, res, next) => {
    const id = req.params.id;
    let book;
    try {
        book = await Books.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }

    if (!book) {
        return res.status(404).json({ message: "No book deleted" });
    }

    return res.status(200).json({ message: "Deleted successfully" });
};

// Export all functions
exports.getAllBooks = getAllBooks;
exports.addBook = addBook;
exports.getById = getById;
exports.updateBook = updateBook;
exports.DeleteBookbyId = DeleteBookbyId;
