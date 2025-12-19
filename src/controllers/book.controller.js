import {
  createBook,
  getAllBooks,
  getBookDetail,
  updateBook,
  deleteBook
} from "../services/book.service.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const createBookController = async (req, res) => {
  try {
    const book = await createBook(req.body);
    return successResponse(res, book, "Book created successfully", 201);
  } catch (error) {
    if (error.message === "Author not found") {
      return errorResponse(res, 400, error.message);
    }
    return errorResponse(res, 500, error.message);
  }
};

export const getAllBooksController = async (req, res) => {
  try {
    const books = await getAllBooks();
    return successResponse(res, books, "Get all books successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getBookDetailController = async (req, res) => {
  try {
    const book = await getBookDetail(req.params.id);

    if (!book) {
      return errorResponse(res, 404, "Book not found");
    }

    return successResponse(res, book, "Get book detail successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const updateBookController = async (req, res) => {
  try {
    const book = await updateBook(req.params.id, req.body);

    if (!book) {
      return errorResponse(res, 404, "Book not found");
    }

    return successResponse(res, book, "Book updated successfully");
  } catch (error) {
    if (error.message === "Author not found") {
      return errorResponse(res, 400, error.message);
    }
    return errorResponse(res, 500, error.message);
  }
};

export const deleteBookController = async (req, res) => {
  try {
    const book = await deleteBook(req.params.id);

    if (!book) {
      return errorResponse(res, 404, "Book not found");
    }

    return successResponse(res, null, "Book deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
