import React from "react";
import { X } from "lucide-react";

export default function Modal({ title, children, onClose, footer }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800 text-base">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X size={18} />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
        {footer && (
          <div className="px-5 pb-5 flex gap-3 justify-end">{footer}</div>
        )}
      </div>
    </div>
  );
}
