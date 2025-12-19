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
 * tags:
 *   name: Book
 *   description: Book management
 */

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
 *         description: Book created successfully
 *       400:
 *         description: Validation error or Author not found
 *       500:
 *         description: Server error
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
 *         description: Get all books successfully
 *       500:
 *         description: Server error
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
 *     responses:
 *       200:
 *         description: Get book detail successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
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
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Author not found
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteBookController);

export default router;
