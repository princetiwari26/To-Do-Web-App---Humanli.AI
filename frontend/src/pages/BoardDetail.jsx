import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import TodoModal from "../components/TodoModal";
import ProgressBar from "../components/ProgressBar";
import Button from "../components/ui/Button";
import ToastContainer from "../components/ui/ToastContainer";
import {
  ArrowLeft,
  Trash2,
  Pencil,
  CheckCircle2,
  Plus,
  Search,
  ChevronDown,
  Calendar,
} from "lucide-react";

export default function BoardDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [toast, setToast] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  /* Fetch Todos */
  const loadTodos = async () => {
    const res = await api.get(`/todos/${id}`);
    setTodos(res.data);
    setFilteredTodos(res.data);
  };

  useEffect(() => {
    loadTodos();
  }, [id]);

  /* Search & Filter */
  useEffect(() => {
    let data = [...todos];

    if (search) {
      data = data.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter === "completed") {
      data = data.filter((t) => t.completed);
    } else if (filter === "pending") {
      data = data.filter((t) => !t.completed);
    }

    setFilteredTodos(data);
  }, [search, filter, todos]);

  const toggleTodo = async (todo) => {
    await api.put(`/todos/${todo._id}`, {
      completed: !todo.completed,
    });
    loadTodos();
  };

  const deleteTodo = (todo) => {
    const backupTodos = [...todos];

    setTodos((prev) => prev.filter((t) => t._id !== todo._id));
    setFilteredTodos((prev) => prev.filter((t) => t._id !== todo._id));

    const timer = setTimeout(async () => {
      await api.delete(`/todos/${todo._id}`);
      setToast(null);
    }, 5000);

    setToast({
      message: `"${todo.title}" deleted`,
      action: {
        label: "Undo",
        onClick: () => {
          clearTimeout(timer);
          setTodos(backupTodos);
          setFilteredTodos(backupTodos);
          setToast(null);
        },
      },
    });
  };

  const completedCount = todos.filter((t) => t.completed).length;

  const priorityBorder = (priority) => {
    if (priority === "High") return "border-red-500";
    if (priority === "Medium") return "border-yellow-400";
    if (priority === "Low") return "border-green-500";
    return "border-gray-300";
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <ToastContainer toast={toast} clearToast={() => setToast(null)} />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <div>
          <h1 className="text-xl font-bold">{state?.name}</h1>
          <p className="text-gray-500 text-sm">{state?.description}</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="w-full lg:w-64 bg-white p-1.5 rounded-md border">
          <ProgressBar
            completed={completedCount}
            total={todos.length}
          />
        </div>

        <div className="relative w-full sm:w-64">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search todos..."
            className="w-full px-3 py-2 pl-9 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        <div className="relative w-full sm:w-48">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-purple-500 pr-9"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <ChevronDown
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        <Button
          onClick={() => {
            setEditTodo(null);
            setOpen(true);
          }}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <Plus size={16} />
          Add Todo
        </Button>
      </div>

      {/* Priority Legend */}
      <div className="flex gap-4 mt-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full" />
          High Priority
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-yellow-400 rounded-full" />
          Medium Priority
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full" />
          Low Priority
        </div>
      </div>

      {/* Todo List */}
      <div className="space-y-3 mt-6">
        {filteredTodos.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No todos found
          </div>
        ) : (
          filteredTodos.map((t) => (
            <div
              key={t._id}
              className={`bg-white p-4 rounded-xl shadow-sm flex justify-between gap-4 border-l-4 ${priorityBorder(
                t.priority
              )}`}
            >
              <div className="flex gap-3">
                <div
                  onClick={() => toggleTodo(t)}
                  className={`w-5 h-5 mt-1 rounded-full border flex items-center justify-center cursor-pointer ${
                    t.completed
                      ? "bg-green-500 border-green-500"
                      : "border-gray-400"
                  }`}
                >
                  {t.completed && (
                    <CheckCircle2 size={14} className="text-white" />
                  )}
                </div>

                <div>
                  <p
                    className={`font-medium ${
                      t.completed
                        ? "line-through text-gray-400"
                        : ""
                    }`}
                  >
                    {t.title}
                  </p>

                  {t.description && (
                    <p className="text-sm text-gray-500 mt-1">
                      {t.description}
                    </p>
                  )}

                  {t.dueDate && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Calendar size={14} />
                      {new Date(t.dueDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Pencil
                  size={16}
                  className="cursor-pointer text-gray-500"
                  onClick={() => {
                    setEditTodo(t);
                    setOpen(true);
                  }}
                />
                <Trash2
                  size={16}
                  className="cursor-pointer text-red-500"
                  onClick={() => deleteTodo(t)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {open && (
        <TodoModal
          boardId={id}
          todo={editTodo}
          onClose={() => setOpen(false)}
          onSuccess={loadTodos}
        />
      )}
    </div>
  );
}