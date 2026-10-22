import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { ArrowLeft, Plus, CheckCircle, Clock, Smile, Meh, Frown, Lock } from "lucide-react";
import Modal from "../../components/shared/Modal";

export default function FamilyCheckins({ onBack }) {
  const { checkIn, reminders, proposeReminder, proposedReminders, hasPermission } = useApp();
  const [showPropose, setShowPropose] = useState(false);
  const [form, setForm] = useState({ title: "", time: "", repeat: "Daily" });

  const canSeeCheckins = hasPermission("checkins");

  const handlePropose = () => {
    if (!form.title || !form.time) return;
    proposeReminder(form);
    setForm({ title: "", time: "", repeat: "Daily" });
    setShowPropose(false);
  };

  const moodLabel = checkIn.mood === "happy" ? "😊 Happy" : checkIn.mood === "fine" ? "😐 Fine" : checkIn.mood === "notgreat" ? "😕 Not Great" : null;

  if (!canSeeCheckins) {
    return (
      <div className="p-5 md:p-8 max-w-2xl">
        <button onClick={onBack} className="flex items-center gap-2 text-stone-500 mb-5 text-sm font-semibold hover:text-stone-800">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="bg-white border-2 border-stone-200 rounded-3xl p-8 text-center shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-500 flex items-center justify-center mx-auto mb-3">
            <Lock size={24} />
          </div>
          <h2 className="text-xl font-bold text-noor-charcoal-900 mb-2">Check-in Sharing Disabled</h2>
          <p className="text-sm text-stone-600 max-w-md mx-auto">
            Meera Ji has chosen not to share her daily check-ins and routine reminders with you. She can update this permission at any time in her TrustCircle settings.
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

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-noor-charcoal-900">Daily Wellbeing & Routine</h1>
          <p className="text-sm text-stone-500">Meera Sharma's daily check-ins & proposed reminders</p>
        </div>
        <button
          onClick={() => setShowPropose(true)}
          className="flex items-center gap-1.5 bg-noor-saffron-600 hover:bg-noor-saffron-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm"
          style={{ minHeight: "44px" }}
        >
          <Plus size={16} /> Propose Reminder
        </button>
      </div>

      {/* Check-in Status */}
      <div className={`rounded-2xl p-5 mb-6 border-2 ${checkIn.mood ? "bg-emerald-50 border-emerald-200" : "bg-stone-50 border-stone-200"}`}>
        <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">Today's Check-in</p>
        {checkIn.mood ? (
          <div>
            <p className="text-xl font-bold text-emerald-800">{moodLabel}</p>
            <p className="text-xs text-stone-500 font-medium mt-1">Self-reported by Mom at {checkIn.time}</p>
            <p className="text-xs text-stone-400 mt-2">
              ℹ️ Note: This is an emotional wellbeing self-report, not a medical telemetry check.
            </p>
          </div>
        ) : (
          <p className="text-sm text-stone-600 font-medium">No check-in recorded yet today.</p>
        )}
      </div>

      {/* Proposed Reminders Pending Senior Review */}
      {proposedReminders.length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold text-noor-charcoal-900 text-sm mb-3">Proposed Reminders (Awaiting Mom's Approval)</h2>
          <div className="space-y-2.5">
            {proposedReminders.map((r) => (
              <div key={r.id} className="bg-white border-2 border-amber-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-sm font-bold text-stone-800">{r.title}</p>
                  <p className="text-xs text-stone-500">{r.time} • {r.repeat || "Daily"}</p>
                </div>
                <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full uppercase">
                  Pending Approval
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Senior Reminders Schedule */}
      <div>
        <h2 className="font-bold text-noor-charcoal-900 text-sm mb-3">Mom's Active Routine</h2>
        <div className="space-y-2.5">
          {reminders.map((r) => (
            <div key={r.id} className="bg-white border border-stone-200 rounded-xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className={r.done ? "text-emerald-600" : "text-stone-300"} />
                <span className={`text-sm font-medium ${r.done ? "line-through text-stone-400" : "text-stone-800"}`}>
                  {r.title}
                </span>
              </div>
              <span className="text-xs text-stone-500 font-semibold">{r.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Propose Modal */}
      {showPropose && (
        <Modal
          title="Propose a Reminder for Mom"
          onClose={() => setShowPropose(false)}
          footer={
            <>
              <button onClick={() => setShowPropose(false)} className="px-4 py-2 text-sm text-stone-500 hover:bg-stone-100 rounded-lg">
                Cancel
              </button>
              <button
                onClick={handlePropose}
                disabled={!form.title || !form.time}
                className={`px-5 py-2 text-sm rounded-xl font-bold ${
                  form.title && form.time ? "bg-noor-saffron-600 text-white hover:bg-noor-saffron-700" : "bg-stone-200 text-stone-400 cursor-not-allowed"
                }`}
              >
                Propose Reminder
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <p className="text-xs text-stone-500">
              Mom retains full dignity: proposed reminders will not be activated until she accepts them on her device.
            </p>
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Reminder Title *</label>
              <input
                className="w-full border-2 border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-noor-saffron-500"
                placeholder="e.g. Afternoon Calcium Supplement"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Time *</label>
              <input
                className="w-full border-2 border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-noor-saffron-500"
                placeholder="e.g. 02:00 PM"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
