import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Plus, Trash2, CheckCircle, Clock, ArrowLeft } from "lucide-react";
import Modal from "../../components/shared/Modal";

export default function SeniorMyDay({ onBack }) {
  const { reminders, markReminderDone, snoozeReminder, addReminder } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

  const handleAdd = () => {
    if (!title || !time) return;
    addReminder({ title, time });
    setTitle("");
    setTime("");
    setShowAdd(false);
  };

  const pending = reminders.filter((r) => !r.done);
  const completed = reminders.filter((r) => r.done);

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
          <h1 className="text-2xl md:text-senior-xl font-bold text-noor-charcoal-900">☀️ My Day</h1>
          <p className="text-base text-stone-500 font-medium">Daily Routine & Medicine Reminders</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="senior-touch-btn bg-noor-saffron-600 text-white hover:bg-noor-saffron-700 px-4"
          style={{ minHeight: "48px" }}
        >
          <Plus size={20} className="mr-1" /> Add
        </button>
      </div>

      {/* Routine Reminders List */}
      <div className="space-y-4">
        <h2 className="text-senior-base font-bold text-noor-charcoal-900">
          Upcoming Schedule ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
            <CheckCircle size={40} className="mx-auto text-emerald-600 mb-2" />
            <p className="font-bold text-emerald-900 text-senior-base">All done for today! Bahut badhiya.</p>
          </div>
        ) : (
          pending.map((rem) => (
            <div key={rem.id} className="bg-white border-2 border-stone-200 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-base font-bold text-noor-saffron-700 bg-noor-saffron-50 px-3 py-1 rounded-full mb-1">
                    <Clock size={16} /> {rem.time}
                  </span>
                  <h3 className="font-bold text-lg text-noor-charcoal-900 mt-1">{rem.title}</h3>
                </div>
              </div>
              <div className="flex gap-3 pt-2 border-t border-stone-100">
                <button
                  onClick={() => markReminderDone(rem.id)}
                  className="flex-1 senior-touch-btn bg-emerald-600 text-white hover:bg-emerald-700 gap-2"
                >
                  <CheckCircle size={20} /> Done
                </button>
                <button
                  onClick={() => snoozeReminder(rem.id)}
                  className="senior-touch-btn bg-stone-100 text-stone-700 hover:bg-stone-200 px-4"
                >
                  Snooze
                </button>
              </div>
            </div>
          ))
        )}

        {completed.length > 0 && (
          <div className="mt-8 pt-4 border-t border-stone-200">
            <h2 className="text-base font-bold text-stone-500 mb-3 uppercase tracking-wider">
              Completed Today ({completed.length})
            </h2>
            <div className="space-y-2">
              {completed.map((rem) => (
                <div key={rem.id} className="bg-stone-100 rounded-xl p-3.5 flex items-center justify-between text-stone-500">
                  <span className="line-through font-medium text-base">{rem.title} ({rem.time})</span>
                  <CheckCircle size={18} className="text-emerald-600" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showAdd && (
        <Modal
          title="Add Routine Reminder"
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
                Add Reminder
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="text-base font-bold text-stone-800 block mb-1">What is this reminder for? *</label>
              <input
                className="w-full border-2 border-stone-300 rounded-xl px-4 py-3 text-senior-base text-stone-900 focus:outline-none focus:border-noor-saffron-600"
                placeholder="e.g. Afternoon Blood Pressure Tablet"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="text-base font-bold text-stone-800 block mb-1">What time? *</label>
              <input
                className="w-full border-2 border-stone-300 rounded-xl px-4 py-3 text-senior-base text-stone-900 focus:outline-none focus:border-noor-saffron-600"
                placeholder="e.g. 02:00 PM"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
