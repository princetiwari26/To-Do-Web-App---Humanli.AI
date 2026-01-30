import { useEffect, useState } from "react";
import api from "../api/api";
import BoardCard from "../components/BoardCard";
import BoardModal from "../components/BoardModal";
import Button from "../components/ui/Button";
import ToastContainer from "../components/ui/ToastContainer";
import { Plus, Search, ChevronDown, FolderOpen, SearchX } from "lucide-react";

export default function Boards() {
  const [boards, setBoards] = useState([]);
  const [boardsWithProgress, setBoardsWithProgress] = useState([]);
  const [open, setOpen] = useState(false);
  const [editBoard, setEditBoard] = useState(null);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [openMenuId, setOpenMenuId] = useState(null);

  /* Load boards and progress */
  const loadBoards = async () => {
    const res = await api.get("/boards");

    const enrichedBoards = await Promise.all(
      res.data.map(async (board) => {
        const todosRes = await api.get(`/todos/${board._id}`);

        const total = todosRes.data.length;
        const completed = todosRes.data.filter((t) => t.completed).length;
        const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

        return {
          ...board,
          totalTodos: total,
          completedTodos: completed,
          progress: percent,
        };
      }),
    );

    setBoards(enrichedBoards);
    setBoardsWithProgress(enrichedBoards);
  };

  useEffect(() => {
    loadBoards();
  }, []);

  /* Search and Sort */
  useEffect(() => {
    let data = [...boards];

    if (search) {
      data = data.filter(
        (b) =>
          b.name.toLowerCase().includes(search.toLowerCase()) ||
          b.description?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (sortBy === "newest") {
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "oldest") {
      data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      data.sort((a, b) => a.name.localeCompare(b.name));
    }

    setBoardsWithProgress(data);
  }, [boards, search, sortBy]);

  const handleDelete = (board) => {
    const backup = [...boards];
    setBoards((prev) => prev.filter((b) => b._id !== board._id));

    const timer = setTimeout(async () => {
      await api.delete(`/boards/${board._id}`);
      setToast(null);
    }, 5000);

    setToast({
      message: `"${board.name}" deleted`,
      action: {
        label: "Undo",
        onClick: () => {
          clearTimeout(timer);
          setBoards(backup);
          setToast(null);
        },
      },
    });
  };

  const noBoards = boards.length === 0;
  const noResults = boards.length > 0 && boardsWithProgress.length === 0;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <ToastContainer toast={toast} clearToast={() => setToast(null)} />

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Boards</h1>
          <p className="text-gray-600 text-sm">
            Create and manage your task boards
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search boards..."
              className="w-full px-3 py-2 pl-9 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          {/* Sort */}
          <div className="relative w-full sm:w-44">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-purple-500 pr-9"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name">A to Z</option>
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Add Board */}
          <Button
            onClick={() => {
              setEditBoard(null);
              setOpen(true);
            }}
            className="flex items-center gap-2"
          >
            <Plus size={18} />
            New Board
          </Button>
        </div>
      </div>

      {noBoards && (
        <div className="flex flex-col items-center justify-center py-24 bg-white border rounded-xl">
          <FolderOpen size={48} className="text-gray-300 mb-4" />
          <h3 className="font-semibold text-lg">No boards available</h3>
          <p className="text-gray-500 text-sm mt-1">
            Boards you create will appear here
          </p>
        </div>
      )}

      {/* Search and filter no result */}
      {noResults && (
        <div className="flex flex-col items-center justify-center py-24 bg-white border rounded-xl">
          <SearchX size={48} className="text-gray-300 mb-4" />
          <h3 className="font-semibold text-lg">No items found</h3>
          <p className="text-gray-500 text-sm mt-1">
            Try adjusting your search or sort option
          </p>
        </div>
      )}

      {!noBoards && !noResults && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {boardsWithProgress.map((board) => (
            <BoardCard
              key={board._id}
              board={board}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
              onEdit={(b) => {
                setEditBoard(b);
                setOpen(true);
              }}
              onDelete={() => handleDelete(board)}
            />
          ))}
        </div>
      )}

      {open && (
        <BoardModal
          board={editBoard}
          onClose={() => setOpen(false)}
          onSuccess={loadBoards}
        />
      )}
    </div>
  );
}