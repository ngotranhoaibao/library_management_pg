import {
  createAuthor,
  getAllAuthors,
  getAuthorDetail,
  updateAuthor,
  deleteAuthor
} from "../services/author.service.js";

export const createAuthorController = async (req, res) => {
  try {
    const author = await createAuthor(req.body);
    res.status(201).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllAuthorsController = async (req, res) => {
  try {
    const authors = await getAllAuthors();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAuthorDetailController = async (req, res) => {
  try {
    const author = await getAuthorDetail(req.params.id);

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAuthorController = async (req, res) => {
  try {
    const author = await updateAuthor(req.params.id, req.body);
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAuthorController = async (req, res) => {
  try {
    await deleteAuthor(req.params.id);
    res.json({ message: "Author deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
