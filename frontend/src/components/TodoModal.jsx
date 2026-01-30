// import { useEffect, useState } from "react";
// import api from "../api/api";
// import Button from "./ui/Button";
// import { useToast } from "../context/ToastContext";

// export default function TodoModal({
//   boardId,
//   todo,
//   onClose,
//   onSuccess,
// }) {
//   const isEdit = Boolean(todo);
//   const { showToast } = useToast();

//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");
//   const [priority, setPriority] = useState("Medium");
//   const [dueDate, setDueDate] = useState("");

//   useEffect(() => {
//     if (todo) {
//       setTitle(todo.title || "");
//       setDesc(todo.description || "");
//       setPriority(todo.priority || "Medium");
//       setDueDate(
//         todo.dueDate ? todo.dueDate.split("T")[0] : ""
//       );
//     }
//   }, [todo]);

//   // ✅ Enter key submit
//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === "Enter" && !e.shiftKey) {
//         e.preventDefault();
//         submit();
//       }
//       if (e.key === "Escape") onClose();
//     };

//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   });

//   const submit = async () => {
//     if (!title.trim()) {
//       showToast("Title is required", "error");
//       return;
//     }

//     try {
//       if (isEdit) {
//         await api.put(`/todos/${todo._id}`, {
//           title,
//           description: desc,
//           priority,
//           dueDate,
//         });
//         showToast("Todo updated", "success");
//       } else {
//         await api.post("/todos", {
//           board: boardId,
//           title,
//           description: desc,
//           priority,
//           dueDate,
//         });
//         showToast("Todo added", "success");
//       }

//       onSuccess();
//       onClose();
//     } catch {
//       showToast("Something went wrong", "error");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-xl w-[420px]">
//         <h2 className="font-semibold mb-4">
//           {isEdit ? "Edit Todo" : "Add New Todo"}
//         </h2>

//         <input
//           autoFocus
//           className="input"
//           placeholder="What needs to be done?"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <textarea
//           className="input mt-3"
//           placeholder="Details (Shift + Enter for new line)"
//           value={desc}
//           onChange={(e) => setDesc(e.target.value)}
//         />

//         <select
//           className="input mt-3"
//           value={priority}
//           onChange={(e) => setPriority(e.target.value)}
//         >
//           <option>Low</option>
//           <option>Medium</option>
//           <option>High</option>
//         </select>

//         <input
//           type="date"
//           className="input mt-3"
//           value={dueDate}
//           onChange={(e) => setDueDate(e.target.value)}
//         />

//         <div className="flex justify-end gap-3 mt-6">
//           <Button variant="secondary" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button onClick={submit}>
//             {isEdit ? "Save Changes" : "Add Todo"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import api from "../api/api";
import Button from "./ui/Button";
import { useToast } from "../context/ToastContext";
import { X, Type, Text, Flag, Calendar, AlertCircle } from "lucide-react";

export default function TodoModal({
  boardId,
  todo,
  onClose,
  onSuccess,
}) {
  const isEdit = Boolean(todo);
  const { showToast } = useToast();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title || "");
      setDesc(todo.description || "");
      setPriority(todo.priority || "Medium");
      setDueDate(
        todo.dueDate ? todo.dueDate.split("T")[0] : ""
      );
    } else {
      // Set default due date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDueDate(tomorrow.toISOString().split("T")[0]);
    }
  }, [todo]);

  // Enter key submit
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

  const submit = async () => {
    if (!title.trim()) {
      showToast("Title is required", "error");
      return;
    }

    try {
      setLoading(true);
      
      if (isEdit) {
        await api.put(`/todos/${todo._id}`, {
          title,
          description: desc,
          priority,
          dueDate: dueDate || null,
        });
        showToast("Todo updated successfully", "success");
      } else {
        await api.post("/todos", {
          board: boardId,
          title,
          description: desc,
          priority,
          dueDate: dueDate || null,
        });
        showToast("Todo added successfully", "success");
      }

      onSuccess();
      onClose();
    } catch {
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
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              {isEdit ? <Type className="text-blue-600" size={20} /> : <AlertCircle className="text-blue-600" size={20} />}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {isEdit ? "Edit Todo" : "Add New Todo"}
              </h2>
              <p className="text-sm text-gray-500">
                {isEdit ? "Update your task details" : "Add a new task to this board"}
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

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title Input */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Type size={16} />
              Task Title
            </label>
            <input
              autoFocus
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              placeholder="Add more details about this task..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          {/* Priority */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Flag size={16} />
              Priority
            </label>
            <div className="grid grid-cols-3 gap-10">
              {["Low", "Medium", "High"].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`px-2 py-1 rounded-lg border transition-all duration-200 font-medium ${
                    priority === p
                      ? p === "High"
                        ? "bg-red-500 text-white border-red-500"
                        : p === "Medium"
                        ? "bg-yellow-500 text-white border-yellow-500"
                        : "bg-green-500 text-white border-green-500"
                      : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Calendar size={16} />
              Due Date (Optional)
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-purple-500"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
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
            {isEdit ? "Save Changes" : "Add Todo"}
          </Button>
        </div>
      </div>
    </div>
  );
}