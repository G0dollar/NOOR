import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { ArrowLeft, Plus, UserX, Users, ShieldAlert, CheckCircle2 } from "lucide-react";
import Modal from "../../components/shared/Modal";

const RELATIONS = ["Son", "Daughter", "Grandchild", "Neighbour", "Friend", "Other"];
const PERMISSIONS = [
  { id: "health", label: "My Health Documents" },
  { id: "checkins", label: "Daily Check-ins & Reminders" },
  { id: "shield", label: "NOOR Shield Fraud Alerts" },
];

export default function SeniorTrustCircle({ onBack }) {
  const { trustCircle, addTrustContact, removeTrustContact, updateTrustPermissions, assistanceRequests } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", relation: "Son", avatar: "", permissions: ["checkins"] });

  const handleAdd = () => {
    if (!form.name.trim()) return;
    addTrustContact({
      ...form,
      avatar: form.name.substring(0, 2).toUpperCase(),
    });
    setForm({ name: "", relation: "Son", avatar: "", permissions: ["checkins"] });
    setShowAdd(false);
  };

  const toggleFormPerm = (perm) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
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
          <h1 className="text-2xl md:text-senior-xl font-bold text-noor-charcoal-900">👥 My People</h1>
          <p className="text-base text-stone-500 font-medium">TrustCircle • Control what each person can see</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="senior-touch-btn bg-noor-saffron-600 text-white hover:bg-noor-saffron-700 px-4"
          style={{ minHeight: "48px" }}
        >
          <Plus size={20} className="mr-1" /> Add
        </button>
      </div>

      {/* Senior View of Assistance Requests Dispatched by Family to Trusted Contacts */}
      {assistanceRequests.length > 0 && (
        <div className="mb-6 bg-noor-amber-50 border-2 border-noor-amber-200 rounded-2xl p-5">
          <h2 className="text-lg font-bold text-noor-charcoal-900 mb-2 flex items-center gap-2">
            🤝 TrustCircle Assistance Status
          </h2>
          <p className="text-base text-stone-600 mb-3">
            Requests coordinated between your family and trusted neighbours:
          </p>
          <div className="space-y-3">
            {assistanceRequests.map((req) => {
              const contact = trustCircle.find((c) => c.id === req.contactId);
              return (
                <div key={req.id} className="bg-white rounded-xl p-3 border border-noor-amber-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-stone-800 text-base">{contact?.name || "Trusted Contact"}</span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                      req.status === "accepted"
                        ? "bg-green-100 text-green-800"
                        : req.status === "declined"
                        ? "bg-red-100 text-red-800"
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {req.status === "accepted" ? "Accepted ✓" : req.status === "declined" ? "Unavailable" : "Pending Response"}
                    </span>
                  </div>
                  <p className="text-base text-stone-700">{req.message}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {trustCircle.length === 0 && (
          <div className="text-center py-12 text-stone-400">
            <Users size={48} className="mx-auto mb-3 opacity-40" />
            <p className="text-base">No trusted contacts added yet.</p>
          </div>
        )}
        {trustCircle.map((contact) => (
          <div key={contact.id} className="bg-white border-2 border-stone-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-noor-saffron-100 text-noor-saffron-700 font-bold text-lg flex items-center justify-center shrink-0">
                {contact.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-lg text-noor-charcoal-900">{contact.name}</h3>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                    contact.status === "active" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {contact.status}
                  </span>
                </div>
                <p className="text-base text-stone-500 font-medium">{contact.relation}</p>
              </div>
              <button
                onClick={() => removeTrustContact(contact.id)}
                className="text-stone-300 hover:text-red-500 p-2"
                title="Remove contact"
              >
                <UserX size={20} />
              </button>
            </div>

            {/* Granular Sharing Toggles (Enforced across family screens) */}
            <div className="bg-stone-50 rounded-xl p-3 border border-stone-200">
              <p className="text-sm font-bold text-stone-700 mb-2">Sharing Permissions Allowed by You:</p>
              <div className="space-y-2">
                {PERMISSIONS.map((p) => {
                  const isChecked = (contact.permissions || []).includes(p.id);
                  return (
                    <label key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-white border border-stone-200 cursor-pointer">
                      <span className="text-base font-medium text-stone-800">{p.label}</span>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => updateTrustPermissions(contact.id, p.id)}
                        className="w-5 h-5 accent-noor-saffron-600 rounded"
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Contact Modal */}
      {showAdd && (
        <Modal
          title="Add Trusted Contact"
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
                Add Contact
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="text-base font-bold text-stone-800 block mb-1">Full Name *</label>
              <input
                className="w-full border-2 border-stone-300 rounded-xl px-4 py-3 text-senior-base text-stone-900 focus:outline-none focus:border-noor-saffron-600"
                placeholder="e.g. Priya Sharma"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-base font-bold text-stone-800 block mb-1">Relationship</label>
              <select
                className="w-full border-2 border-stone-300 rounded-xl px-4 py-3 text-senior-base text-stone-900 focus:outline-none focus:border-noor-saffron-600 bg-white"
                value={form.relation}
                onChange={(e) => setForm({ ...form, relation: e.target.value })}
              >
                {RELATIONS.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="text-base font-bold text-stone-800 block mb-2">What can they see?</label>
              <div className="space-y-2">
                {PERMISSIONS.map((p) => (
                  <label key={p.id} className="flex items-center gap-3 p-2.5 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.permissions.includes(p.id)}
                      onChange={() => toggleFormPerm(p.id)}
                      className="w-5 h-5 accent-noor-saffron-600 rounded"
                    />
                    <span className="text-base font-medium text-stone-800">{p.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
