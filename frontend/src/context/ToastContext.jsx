import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (
    message,
    type = "success",
    actionLabel = null,
    actionFn = null,
    duration = 4000
  ) => {
    setToast({ message, type, actionLabel, actionFn });

    setTimeout(() => {
      setToast(null);
    }, duration);
  };

  const closeToast = () => setToast(null);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white min-w-[280px] max-w-[400px] animate-slideIn
            ${
              toast.type === "success"
                ? "bg-green-500 border-l-4 border-green-600"
                : toast.type === "error"
                ? "bg-red-500 border-l-4 border-red-600"
                : "bg-gray-800 border-l-4 border-gray-900"
            }`}
          style={{
            animation: "slideIn 0.3s ease-out",
          }}
        >
          <span className="flex-1 text-sm sm:text-base">{toast.message}</span>

          {toast.actionLabel && (
            <button
              onClick={() => {
                toast.actionFn?.();
                closeToast();
              }}
              className="font-semibold text-sm underline hover:opacity-80 transition-opacity"
            >
              {toast.actionLabel}
            </button>
          )}

          <button
            onClick={closeToast}
            className="text-white/80 hover:text-white text-lg transition-colors"
          >
            ×
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @media (max-width: 640px) {
          .fixed {
            top: auto;
            bottom: 5;
            right: 5;
            left: 5;
            max-width: calc(100% - 40px);
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);