import React from "react";
import { useApp } from "../../context/AppContext";

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  const colors = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
  };

  return (
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-lg text-white text-sm font-medium shadow-lg ${colors[toast.type] || colors.success}`}
      style={{ minWidth: 220, textAlign: "center" }}
    >
      {toast.message}
    </div>
  );
}
