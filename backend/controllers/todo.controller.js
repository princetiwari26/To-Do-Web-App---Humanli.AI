import Todo from "../models/todo.model.js";

export const createTodo = async (req, res) => {
  const todo = await Todo.create(req.body);
  res.json(todo);
};

export const getTodos = async (req, res) => {
  const todos = await Todo.find({ board: req.params.boardId });
  res.json(todos);
};

export const updateTodo = async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(todo);
};

export const deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
};
