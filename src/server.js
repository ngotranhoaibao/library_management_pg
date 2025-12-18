import express from "express";
import dotenv from "dotenv";
import authorRouter from "./routes/author.route.js";
import bookRouter from "./routes/book.route.js";
import { swaggerDocs } from './swagger.js';

dotenv.config();

const app = express();
swaggerDocs(app);
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
