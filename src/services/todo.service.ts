/**
 * Data Model Interfaces
 */
import { Todo, Todos } from "../models/Todo";

/**
 * In-Memory Store
 */

let todos: Todos = {
  1: {
    id: 1,
    title: "Learn React",
    description: "learn react",
  },
  2: {
    id: 2,
    title: "Learn Typescript",
    description: "learn typescript",
  },
};

/**
 * Service Methods
 */
export const findAll = async (): Promise<Todo[]> => Object.values(todos);

export const find = async (id: number): Promise<Todo> => todos[id];

export const create = async (newItem: Omit<Todo, "id">): Promise<Todo> => {
  const id = new Date().valueOf();

  todos[id] = {
    id,
    ...newItem,
  };

  return todos[id];
};

export const update = async (
  id: number,
  todoUpdate: Partial<Todo>
): Promise<Todo | null> => {
  const todo = await find(id);

  if (!todo) {
    return null;
  }

  todos[id] = { ...todo, ...todoUpdate };

  return todos[id];
};

export const remove = async (id: number): Promise<null | void> => {
  const todo = await find(id);

  if (!todo) {
    return null;
  }

  delete todos[id];
};
