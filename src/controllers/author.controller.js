import {
  createAuthor,
  getAllAuthors,
  getAuthorDetail,
  updateAuthor,
  deleteAuthor,
} from "../services/author.service.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const createAuthorController = async (req, res) => {
  try {
    const author = await createAuthor(req.body);
    return successResponse(res, author, "Author created successfully", 201);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getAllAuthorsController = async (req, res) => {
  try {
    const authors = await getAllAuthors();
    return successResponse(res, authors, "Get all authors successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getAuthorDetailController = async (req, res) => {
  try {
    const author = await getAuthorDetail(req.params.id);

    if (!author) {
      return errorResponse(res, 404, "Author not found");
    }

    return successResponse(res, author, "Get author detail successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const updateAuthorController = async (req, res) => {
  try {
    const author = await updateAuthor(req.params.id, req.body);

    if (!author) {
      return errorResponse(res, 404, "Author not found");
    }

    return successResponse(res, author, "Author updated successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const deleteAuthorController = async (req, res) => {
  try {
    const author = await deleteAuthor(req.params.id);

    if (!author) {
      return errorResponse(res, 404, "Author not found");
    }

    return successResponse(res, null, "Author deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
