import {
  createBook,
  getAllBooks,
  getBookDetail,
  updateBook,
  deleteBook
} from "../services/book.service.js";

export const createBookController = async (req, res) => {
  try {
    const book = await createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBooksController = async (req, res) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookDetailController = async (req, res) => {
  try {
    const book = await getBookDetail(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookController = async (req, res) => {
  try {
    const book = await updateBook(req.params.id, req.body);
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBookController = async (req, res) => {
  try {
    await deleteBook(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
