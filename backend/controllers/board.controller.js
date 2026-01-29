import Board from "../models/board.model.js";

export const createBoard = async (req, res) => {
  const board = await Board.create({ ...req.body, user: req.userId });
  res.json(board);
};

export const getBoards = async (req, res) => {
  const boards = await Board.find({ user: req.userId });
  res.json(boards);
};

export const updateBoard = async (req, res) => {
  try {
    const { name, description, color } = req.body;

    const board = await Board.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { name, description, color },
      { new: true },
    );

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.json(board);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBoard = async (req, res) => {
  await Board.findByIdAndDelete(req.params.id);
  res.json({ message: "Board deleted" });
};
