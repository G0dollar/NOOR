import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Smile, Meh, Frown, CheckCircle, Shield, Calendar, Heart, FileText, ArrowRight } from "lucide-react";

const MOODS = [
  { id: "happy", label: "Happy", icon: Smile, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
  { id: "fine", label: "Fine", icon: Meh, color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
  { id: "notgreat", label: "Not Great", icon: Frown, color: "text-rose-500", bg: "bg-rose-50 border-rose-200" },
];

const PILLARS = [
  {
    id: "health",
    icon: "🏥",
    title: "My Health",
    subtitle: "Medical records & prescriptions",
    button: "Open Health",
    border: "border-noor-saffron-200",
    bg: "bg-white",
    badge: "Medical Manager",
  },
  {
    id: "myday",
    icon: "☀️",
    title: "My Day",
    subtitle: "Daily routine, check-in & medicines",
    button: "View My Day",
    border: "border-noor-amber-200",
    bg: "bg-white",
    badge: "Daily Routine",
  },
  {
    id: "events",
    icon: "🎯",
    title: "Mehfil",
    subtitle: "Carrom, walks, bhajans & friends",
    button: "Explore Activities",
    border: "border-noor-saffron-200",
    bg: "bg-white",
    badge: "Social Mehfil",
  },
  {
    id: "shield",
    icon: "🛡️",
    title: "Stay Safe",
    subtitle: "Fraud & scam protection shield",
    button: "Open Shield",
    border: "border-noor-amber-200",
    bg: "bg-white",
    badge: "NOOR Shield",
  },
];

export default function SeniorHome({ onNavigate }) {
  const { checkIn, submitCheckIn, trustCircle, proposedReminders, acceptProposedReminder, declineProposedReminder } = useApp();
  const [showCheckIn, setShowCheckIn] = useState(!checkIn.mood);

  const handleMood = (mood) => {
    submitCheckIn(mood);
    setShowCheckIn(false);
  };

  return (
    <div className="p-5 md:p-6 space-y-6 max-w-lg mx-auto">
      {/* Greeting Banner */}
      <div className="bg-gradient-to-br from-noor-saffron-50 via-noor-amber-50 to-white border-2 border-noor-saffron-200 rounded-3xl p-6 shadow-sm">
        <span className="inline-block text-sm font-bold uppercase tracking-wider text-noor-saffron-700 bg-noor-saffron-100 px-3 py-1 rounded-full mb-3">
          Daily Mehfil
        </span>
        <h1 className="text-2xl md:text-senior-xl font-bold text-noor-charcoal-900 leading-snug">
          🙏 Namaste, Meera Ji!
        </h1>
        <p className="text-senior-base text-stone-600 mt-1 font-medium">
          Unki mehfil, aapka bharosa. Aaj aap kya karna chahengi?
        </p>
      </div>

      {/* Proposed Reminders Alert */}
      {proposedReminders.length > 0 && (
        <div className="bg-noor-amber-50 border-2 border-noor-amber-300 rounded-2xl p-5 shadow-sm">
          <p className="font-bold text-noor-charcoal-900 text-senior-base mb-3 flex items-center gap-2">
            📬 {proposedReminders.length} reminder{proposedReminders.length > 1 ? "s" : ""} proposed by Aarav
          </p>
          <div className="space-y-3">
            {proposedReminders.map((rem) => (
              <div key={rem.id} className="bg-white rounded-xl p-4 border border-noor-amber-200 flex flex-col gap-3">
                <div>
                  <p className="font-bold text-noor-charcoal-900 text-senior-base">{rem.title}</p>
                  <p className="text-base text-stone-500 font-medium">Scheduled: {rem.time}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => acceptProposedReminder(rem.id)}
                    className="flex-1 senior-touch-btn bg-noor-olive-600 text-white hover:bg-noor-olive-700"
                    style={{ minHeight: "50px" }}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => declineProposedReminder(rem.id)}
                    className="flex-1 senior-touch-btn bg-stone-100 text-stone-700 hover:bg-stone-200"
                    style={{ minHeight: "50px" }}
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Check-In Card */}
      <div className="bg-white border-2 border-stone-200 rounded-3xl p-6 shadow-sm">
        {showCheckIn && !checkIn.mood ? (
          <div>
            <h2 className="font-bold text-noor-charcoal-900 text-senior-base mb-4 text-center">
              How are you feeling this morning?
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {MOODS.map(({ id, label, icon: Icon, color, bg }) => (
                <button
                  key={id}
                  onClick={() => handleMood(id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 ${bg} hover:scale-102 transition-transform`}
                  style={{ minHeight: "100px" }}
                >
                  <Icon size={44} className={color} />
                  <span className="text-senior-base font-bold text-stone-800 mt-2">{label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle size={28} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-noor-charcoal-900 text-senior-base">
                Check-in Recorded: <span className="capitalize text-emerald-700">{checkIn.mood}</span>
              </p>
              <p className="text-base text-stone-500 font-medium">
                {checkIn.time} • Shared with Aarav
              </p>
            </div>
            <button
              onClick={() => setShowCheckIn(true)}
              className="text-base font-bold text-noor-saffron-600 hover:text-noor-saffron-700 underline"
            >
              Change
            </button>
          </div>
        )}
      </div>

      {/* 4 Pillars Grid (Warm Saffron / Amber Indian Eldercare Palette) */}
      <div>
        <h2 className="text-senior-base font-bold text-noor-charcoal-900 mb-4">
          Four Pillars of Care & Mehfil
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PILLARS.map((p) => (
            <div
              key={p.id}
              className={`border-2 ${p.border} ${p.bg} rounded-3xl p-5 flex flex-col justify-between shadow-sm hover:border-noor-saffron-500 transition-colors`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-4xl">{p.icon}</span>
                  <span className="text-xs font-bold uppercase tracking-wider bg-noor-saffron-50 text-noor-saffron-700 border border-noor-saffron-200 px-2.5 py-1 rounded-full">
                    {p.badge}
                  </span>
                </div>
                <h3 className="font-bold text-noor-charcoal-900 text-senior-base mb-1">{p.title}</h3>
                <p className="text-base text-stone-600 mb-5">{p.subtitle}</p>
              </div>
              <button
                onClick={() => onNavigate(p.id)}
                className="w-full senior-touch-btn bg-noor-saffron-600 text-white hover:bg-noor-saffron-700 shadow-md gap-2"
              >
                {p.button} <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* TrustCircle Quick Bar */}
      <div className="bg-white border-2 border-stone-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-noor-charcoal-900 text-senior-base">👥 My People — TrustCircle</h2>
          <button
            onClick={() => onNavigate("trust")}
            className="text-base font-bold text-noor-saffron-600 hover:underline"
          >
            Manage →
          </button>
        </div>
        <p className="text-base text-stone-600 mb-4">You have full control over what each contact can view.</p>
        <div className="flex gap-3 flex-wrap">
          {trustCircle.map((c) => (
            <div key={c.id} className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3">
              <div className="w-10 h-10 rounded-full bg-noor-saffron-100 text-noor-saffron-800 font-bold text-base flex items-center justify-center">
                {c.avatar}
              </div>
              <div>
                <p className="font-bold text-noor-charcoal-900 text-base">{c.name}</p>
                <p className="text-sm text-stone-500 font-medium">{c.relation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
