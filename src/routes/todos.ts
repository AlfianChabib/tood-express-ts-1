import express, { Request, Response } from "express";
import {
  deleteTodo,
  getTodo,
  getTodos,
  postTodo,
  updateTodo,
} from "../controller/todos";
const router = express.Router();

// CREATE - POST
router.post("/", postTodo);

// READ - GET
router.get("/", getTodos);

router.get("/:id", getTodo);

// UPDATE - PUT
router.put("/:id", updateTodo);

// DELETE - DELETE
router.delete("/:id", deleteTodo);

export default router;
