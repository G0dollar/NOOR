import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { FileText, Plus, Eye, EyeOff, Trash2, ArrowLeft } from "lucide-react";
import Modal from "../../components/shared/Modal";

const DOC_TYPES = ["Prescription", "Blood Report", "Vaccination", "Other"];

export default function SeniorHealth({ onBack }) {
  const { documents, addDocument, deleteDocument, toggleDocumentShare } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", type: "Prescription", note: "" });

  const handleAdd = () => {
    if (!form.title) return;
    addDocument({
      ...form,
      date: new Date().toISOString().split("T")[0],
    });
    setForm({ title: "", type: "Prescription", note: "" });
    setShowAdd(false);
  };

  return (
    <div className="p-5 md:p-6 max-w-lg mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-stone-600 mb-5 text-base font-semibold"
        style={{ minHeight: "44px" }}
      >
        <ArrowLeft size={20} /> Back to Home
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-senior-xl font-bold text-noor-charcoal-900">🏥 My Health</h1>
          <p className="text-base text-stone-500 font-medium">Prescriptions, Lab Reports & Tests</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="senior-touch-btn bg-noor-saffron-600 text-white hover:bg-noor-saffron-700 px-4"
          style={{ minHeight: "48px" }}
        >
          <Plus size={20} className="mr-1" /> Add
        </button>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-white border-2 border-stone-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start gap-4 mb-3">
              <span className="text-3xl">
                {doc.type === "Prescription" ? "💊" : doc.type === "Blood Report" ? "🩸" : "📄"}
              </span>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-noor-charcoal-900">{doc.title}</h3>
                <p className="text-base text-stone-500 font-medium">{doc.type} • {doc.date}</p>
                {doc.note && <p className="text-base text-stone-700 mt-2 bg-stone-50 rounded-xl p-3 border border-stone-100">{doc.note}</p>}
              </div>
              <button
                onClick={() => deleteDocument(doc.id)}
                className="text-stone-300 hover:text-red-500 p-2"
                title="Remove"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-base font-medium text-stone-700">
                Share with family (Aarav):
              </span>
              <button
                onClick={() => toggleDocumentShare(doc.id)}
                className={`senior-touch-btn gap-2 text-base px-4 py-2 ${
                  doc.shared
                    ? "bg-emerald-50 text-emerald-800 border-2 border-emerald-300"
                    : "bg-stone-100 text-stone-600 border border-stone-200"
                }`}
                style={{ minHeight: "44px" }}
              >
                {doc.shared ? <><Eye size={18} /> Shared</> : <><EyeOff size={18} /> Private</>}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <Modal
          title="Add Health Document"
          onClose={() => setShowAdd(false)}
          footer={
            <>
              <button
                onClick={() => setShowAdd(false)}
                className="senior-touch-btn bg-stone-100 text-stone-700 hover:bg-stone-200 px-5 text-base"
                style={{ minHeight: "48px" }}
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="senior-touch-btn bg-noor-saffron-600 text-white hover:bg-noor-saffron-700 px-6 text-base"
                style={{ minHeight: "48px" }}
              >
                Save Record
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="text-base font-bold text-stone-800 block mb-1">Document Title *</label>
              <input
                className="w-full border-2 border-stone-300 rounded-xl px-4 py-3 text-senior-base text-stone-900 focus:outline-none focus:border-noor-saffron-600"
                placeholder="e.g. Dr. Mehta Knee Prescription"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-base font-bold text-stone-800 block mb-1">Type</label>
              <select
                className="w-full border-2 border-stone-300 rounded-xl px-4 py-3 text-senior-base text-stone-900 focus:outline-none focus:border-noor-saffron-600 bg-white"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                {DOC_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-base font-bold text-stone-800 block mb-1">Doctor Note / Instructions</label>
              <textarea
                className="w-full border-2 border-stone-300 rounded-xl px-4 py-3 text-senior-base text-stone-900 focus:outline-none focus:border-noor-saffron-600 resize-none"
                rows={3}
                placeholder="e.g. 1 tablet after breakfast for 15 days"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
