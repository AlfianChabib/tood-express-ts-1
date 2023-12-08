import { Request, Response } from "express";
import { readFileSync, writeFileSync } from "fs";
import { httpStatus } from "../utils/httpStatus";

const readFileFromJson = (): { id: number; todo: string }[] => {
  const users = readFileSync("src/data/todos.json", "utf-8");
  return JSON.parse(users);
};

const writeFileIntoJson = (
  data: {
    id: number;
    todo: string;
  }[]
): { id: number; todo: string }[] => {
  writeFileSync("src/data/todos.json", JSON.stringify(data, null, 2), "utf8");

  return data;
};

export const postTodo = (req: Request, res: Response) => {
  const todos = readFileFromJson();
  console.log(req.body);
  const lastId = todos[todos.length - 1].id;

  todos.push({
    id: lastId + 1,
    todo: req.body.todo,
  });

  writeFileIntoJson(todos);
  return res.status(httpStatus.CREATED).json({
    code: httpStatus.CREATED,
    message: "POST todos success",
    data: todos,
  });
};

export const getTodos = (req: Request, res: Response) => {
  const todos = readFileFromJson();

  return res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: "GET todos success",
    data: todos,
  });
};

export const updateTodo = (req: Request, res: Response) => {
  const todos = readFileFromJson();
  const { id } = req.params;

  const index = todos.findIndex((todo) => todo.id === parseInt(id));
  todos[index].todo = req.body.todo;

  writeFileIntoJson(todos);

  return res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: "PUT todos success",
    data: {
      id: todos[index].id,
      todo: todos,
    },
  });
};

export const getTodo = (req: Request, res: Response) => {
  const todos = readFileFromJson();
  const { id } = req.params;

  const index = todos.find((todo) => todo.id === parseInt(id));

  return res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: "GET todo success",
    data: index,
  });
};

export const deleteTodo = (req: Request, res: Response) => {
  const todos = readFileFromJson();
  const { id } = req.params;

  if (isNaN(parseInt(id))) {
    return res.status(httpStatus.BAD_REQUEST).json({
      code: httpStatus.BAD_REQUEST,
      message: "id must be a number",
    });
  }

  const index = todos.findIndex((todo) => todo.id === parseInt(id));
  if (index === -1) {
    return res.status(httpStatus.NOT_FOUND).json({
      code: httpStatus.NOT_FOUND,
      message: `User with id ${id} not found`,
    });
  }

  todos.splice(index, 1);
  writeFileIntoJson(todos);
  return res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: "DELETE todo success",
    data: todos,
  });
};
