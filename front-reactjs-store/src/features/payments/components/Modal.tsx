import React from "react";
import { usePayment } from "../hooks/usePayment";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const {isPaying} = usePayment()
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 space-y-4">
        {title && <h2 className="text-xl font-semibold">{title}</h2>}
        <div>{children}</div>
        {!isPaying && (
          <div className="text-right">
            <button
              className="mt-4 bg-black text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
