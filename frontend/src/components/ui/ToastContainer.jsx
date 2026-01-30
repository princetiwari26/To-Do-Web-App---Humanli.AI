import Toast from "./Toast";

export default function ToastContainer({ toast, clearToast }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Toast {...toast} onClose={clearToast} />
    </div>
  );
}