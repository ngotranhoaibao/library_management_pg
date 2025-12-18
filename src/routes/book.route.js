import express from "express";
import { body, validationResult } from "express-validator";
import {
  createBookController,
  getAllBooksController,
  getBookDetailController,
  updateBookController,
  deleteBookController
} from "../controllers/book.controller.js";

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(400).json({ errors: errors.array() });
};

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create new book
 *     tags: [Book]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Created
 */
router.post(
  "/",
  [
    body("title").trim().notEmpty(),
    body("price").isFloat({ gt: 0 }),
    body("authorId").isInt()
  ],
  validate,
  createBookController
);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Book]
 *     responses:
 *       200:
 *         description: List of books
 */
router.get("/", getAllBooksController);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get book detail
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/:id", getBookDetailController);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update book
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.put(
  "/:id",
  [
    body("title").optional().trim().notEmpty(),
    body("price").optional().isFloat({ gt: 0 }),
    body("authorId").optional().isInt()
  ],
  validate,
  updateBookController
);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete book
 *     tags: [Book]
 */
router.delete("/:id", deleteBookController);

export default router;
