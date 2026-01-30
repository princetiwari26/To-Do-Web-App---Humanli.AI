import { useNavigate } from "react-router-dom";
import { MoreVertical, Calendar, Pencil, Trash2 } from "lucide-react";

export default function BoardCard({
  board,
  openMenuId,
  setOpenMenuId,
  onEdit,
  onDelete,
}) {
  const navigate = useNavigate();
  const isMenuOpen = openMenuId === board._id;

  const createdOn = board.createdAt
    ? new Date(board.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div
      onClick={() =>
        navigate(`/boards/${board._id}`, { state: board })
      }
      className="bg-white rounded-xl shadow p-4 border-t-4 cursor-pointer relative"
      style={{ borderColor: board.color }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpenMenuId(isMenuOpen ? null : board._id);
        }}
        className="absolute top-3 right-3 p-1 rounded hover:bg-gray-100"
      >
        <MoreVertical size={18} />
      </button>

      {isMenuOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="menu-container absolute top-10 right-3 bg-white border shadow-lg rounded-lg w-36 z-20"
        >
          <button
            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100"
            onClick={() => {
              setOpenMenuId(null);
              onEdit(board);
            }}
          >
            <Pencil size={14} /> Edit
          </button>

          <button
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            onClick={() => {
              setOpenMenuId(null);
              onDelete(board);
            }}
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}

      <h3 className="font-semibold text-lg pr-6">{board.name}</h3>

      {board.description && (
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {board.description}
        </p>
      )}

      {createdOn && (
        <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
          <Calendar size={14} />
          Created on {createdOn}
        </div>
      )}

      {board.totalTodos === 0 ? (
        <div className="mt-4 text-sm text-gray-400 text-center">
          Empty
        </div>
      ) : (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>
              {board.completedTodos} / {board.totalTodos} done
            </span>
            <span>{board.progress}%</span>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
              style={{ width: `${board.progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
