import { ReactElement, useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactElement;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  // Close modal when pressing 'Escape' key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-2xl relative"
        onClick={(e) => e.stopPropagation()} // Prevents closing modal when clicking inside
      >
        <button
          type="button"
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}
