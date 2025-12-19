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
 * tags:
 *   name: Author
 *   description: Author management
 */

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
 *         description: Author created successfully
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
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
 *         description: Get all authors successfully
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
 *         description: Get author detail successfully
 *       404:
 *         description: Author not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 *       500:
 *         description: Server error
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
 *         description: Author updated successfully
 *       404:
 *         description: Author not found
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
 *         description: Author deleted successfully
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteAuthorController);

export default router;
