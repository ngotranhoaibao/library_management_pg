import express from "express";
import { body, validationResult } from "express-validator";
import {
  createAuthorController,
  getAllAuthorsController,
  getAuthorDetailController,
  updateAuthorController,
  deleteAuthorController
} from "../controllers/author.controller.js";

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(400).json({ errors: errors.array() });
};

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create new author
 *     tags: [Author]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("bio").optional().isString()
  ],
  validate,
  createAuthorController
);

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Author]
 *     responses:
 *       200:
 *         description: List of authors
 *       500:
 *         description: Server error
 */
router.get("/", getAllAuthorsController);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get author detail
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Author detail
 *       404:
 *         description: Author not found
 */
router.get("/:id", getAuthorDetailController);

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update author
 *     tags: [Author]
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
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Updated
 *       500:
 *         description: Server error
 */
router.put(
  "/:id",
  [
    body("name").optional().trim().notEmpty(),
    body("bio").optional().isString()
  ],
  validate,
  updateAuthorController
);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete author
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete("/:id", deleteAuthorController);

export default router;
