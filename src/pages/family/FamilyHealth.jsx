import React from "react";
import { useApp } from "../../context/AppContext";
import { ArrowLeft, Eye, EyeOff, FileText, Lock } from "lucide-react";

export default function FamilyHealth({ onBack }) {
  const { documents, hasPermission } = useApp();
  const canSeeHealth = hasPermission("health");
  const sharedDocs = documents.filter((d) => d.shared);

  if (!canSeeHealth) {
    return (
      <div className="p-5 md:p-8 max-w-2xl">
        <button onClick={onBack} className="flex items-center gap-2 text-stone-500 mb-5 text-sm font-semibold hover:text-stone-800">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="bg-white border-2 border-stone-200 rounded-3xl p-8 text-center shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-500 flex items-center justify-center mx-auto mb-3">
            <Lock size={24} />
          </div>
          <h2 className="text-xl font-bold text-noor-charcoal-900 mb-2">Health Records Sharing Disabled</h2>
          <p className="text-sm text-stone-600 max-w-md mx-auto">
            Meera Ji has not enabled Health Document sharing for this account in her TrustCircle settings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 md:p-8 max-w-2xl">
      <button onClick={onBack} className="flex items-center gap-2 text-stone-500 mb-5 text-sm font-semibold hover:text-stone-800">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-noor-saffron-100 flex items-center justify-center text-noor-saffron-600">
          <FileText size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-noor-charcoal-900">Medical Manager</h1>
          <p className="text-sm text-stone-500">Meera Sharma — Shared health records only</p>
        </div>
      </div>

      <div className="bg-noor-amber-50 border border-noor-amber-200 rounded-xl px-4 py-3 mb-6 text-xs text-amber-900 font-medium">
        ℹ️ Senior Privacy Respected: You can only view documents that Meera Ji has explicitly marked as shared.
      </div>

      {sharedDocs.length === 0 ? (
        <div className="text-center py-12 text-stone-400">
          <EyeOff size={40} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm font-medium">No documents shared yet.</p>
          <p className="text-xs mt-1">Meera Ji can enable sharing for individual records in her Health tab.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sharedDocs.map((doc) => (
            <div key={doc.id} className="bg-white border-2 border-stone-200 rounded-2xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="text-2xl">
                  {doc.type === "Prescription" ? "💊" : doc.type === "Blood Report" ? "🩸" : "📄"}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-noor-charcoal-900 text-base mb-0.5">{doc.title}</h3>
                  <p className="text-xs text-stone-500 font-medium">{doc.type} • {doc.date}</p>
                  {doc.note && <p className="text-sm text-stone-700 mt-1">{doc.note}</p>}
                </div>
                <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                  <Eye size={12} /> Shared
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
