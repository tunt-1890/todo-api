import express, { Request, Response } from "express";
import { Todo } from "../models/Todo";
import * as TodoService from "../services/todo.service";

/**
 * Router Definition
 */

export const todosController = express.Router();

/**
 * Controller Definitions
 */

// GET todos

todosController.get("/", async (req: Request, res: Response) => {
  try {
    const todos: Todo[] = await TodoService.findAll();

    res.status(200).send(todos);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// GET todos/:id

todosController.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const item: Todo = await TodoService.find(id);

    if (item) {
      return res.status(200).send(item);
    }

    res.status(404).send("item not found");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// POST todos

todosController.post("/", async (req: Request, res: Response) => {
  try {
    const todo: Todo = req.body;

    const newTodo = await TodoService.create(todo);

    res.status(201).json(newTodo);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// PUT todos/:id

todosController.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const todoUpdate: Todo = req.body;

    const existingTodo: Todo = await TodoService.find(id);

    if (existingTodo) {
      const updatedTodo = await TodoService.update(id, todoUpdate);
      return res.status(200).json(updatedTodo);
    }

    const newTodo = await TodoService.create(todoUpdate);

    res.status(201).json(newTodo);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// DELETE items/:id

todosController.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await TodoService.remove(id);

    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
