import { useEffect, useState } from "react";
import api from "../api/api";
import Button from "../components/ui/Button";
import { useToast } from "../context/ToastContext";
import { X, Palette, Type, Text } from "lucide-react";

const colors = [
  "#0ea5e9",
  "#22c55e",
  "#8b5cf6",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#6366f1",
  "#14b8a6",
];

export default function BoardModal({ board, onClose, onSuccess }) {
  const isEdit = Boolean(board);
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState(colors[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        submit();
      }
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  useEffect(() => {
    if (board) {
      setName(board.name || "");
      setDesc(board.description || "");
      setColor(board.color || colors[0]);
    } else {
      setName("");
      setDesc("");
      setColor(colors[0]);
    }
  }, [board]);

  const submit = async () => {
    if (!name.trim()) {
      showToast("Board name is required", "error");
      return;
    }

    try {
      setLoading(true);

      if (isEdit) {
        await api.put(`/boards/${board._id}`, {
          name,
          description: desc,
          color,
        });
        showToast("Board updated successfully", "success");
      } else {
        await api.post("/boards", {
          name,
          description: desc,
          color,
        });
        showToast("Board created successfully", "success");
      }

      onSuccess();
      onClose();
    } catch (err) {
      showToast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Palette className="text-blue-600" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {isEdit ? "Edit Board" : "Create New Board"}
              </h2>
              <p className="text-sm text-gray-500">
                {isEdit ? "Update your board details" : "Add a new board to organize tasks"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Name Input */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Type size={16} />
              Board Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="e.g., Project Launch, Personal Tasks"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Text size={16} />
              Description (Optional)
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="Describe what this board is for..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          {/* Color Picker */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
              <Palette size={16} />
              Choose a Color
            </label>
            <div className="flex gap-2 flex-wrap">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-lg cursor-pointer border-2 transition-all duration-200 hover:scale-110 ${
                    color === c
                      ? "border-gray-800 ring-2 ring-offset-2 ring-gray-200"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: c }}
                  title={`Select ${c}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
          <Button
            variant="secondary"
            onClick={onClose}
            className="px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={submit}
            isLoading={loading}
            className="px-6"
          >
            {isEdit ? "Save Changes" : "Create Board"}
          </Button>
        </div>
      </div>
    </div>
  );
}