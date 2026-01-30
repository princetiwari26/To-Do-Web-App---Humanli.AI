import { X } from "lucide-react";

export default function Toast({ message, action, onClose }) {
  return (
    <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-4">
      <span className="text-sm">{message}</span>

      {action && (
        <button
          onClick={action.onClick}
          className="text-blue-400 text-sm hover:underline"
        >
          {action.label}
        </button>
      )}

      <X
        size={16}
        className="cursor-pointer opacity-70 hover:opacity-100"
        onClick={onClose}
      />
    </div>
  );
}