import React from "react";
import { useApp } from "../../context/AppContext";
import { FileText, CheckCircle, Calendar, Shield, Users, Smile, Meh, Frown, Lock } from "lucide-react";

const moodIcon = (mood) => {
  if (mood === "happy") return <Smile size={18} className="text-emerald-600 inline" />;
  if (mood === "fine") return <Meh size={18} className="text-amber-600 inline" />;
  if (mood === "notgreat") return <Frown size={18} className="text-rose-500 inline" />;
  return null;
};

export default function FamilyHome({ onNavigate }) {
  const { documents, reminders, checkIn, shieldMessages, myBookings, events, trustCircle, hasPermission } = useApp();

  const canSeeHealth = hasPermission("health");
  const canSeeCheckins = hasPermission("checkins");
  const canSeeShield = hasPermission("shield");

  const sharedDocs = documents.filter((d) => d.shared);
  const completedReminders = reminders.filter((r) => r.done);
  const pendingReminders = reminders.filter((r) => !r.done);
  // Family only reviews messages that Meera explicitly dispatched (sentToFamily === true)
  const pendingShield = shieldMessages.filter((m) => m.sentToFamily && m.status === "pending");
  const myEventList = events.filter((e) => myBookings.includes(e.id));

  const CARDS = [
    {
      id: "health",
      icon: FileText,
      color: "border-stone-200",
      allowed: canSeeHealth,
      badge: "Medical Manager",
      title: "Medical Records",
      stat: canSeeHealth ? `${sharedDocs.length} Documents Shared` : "Sharing Restricted",
      detail: canSeeHealth
        ? (sharedDocs[0] ? `Latest: ${sharedDocs[0].title}` : "No documents shared yet")
        : "Meera Ji has not enabled Health Document sharing with you in TrustCircle",
      button: canSeeHealth ? "View Records" : "Permission Required",
      btnColor: canSeeHealth ? "bg-noor-saffron-600 hover:bg-noor-saffron-700 text-white" : "bg-stone-200 text-stone-500 cursor-not-allowed",
    },
    {
      id: "checkins",
      icon: CheckCircle,
      color: "border-stone-200",
      allowed: canSeeCheckins,
      badge: "Daily Wellbeing",
      title: "Daily Check-in & Routine",
      stat: canSeeCheckins
        ? (checkIn.mood ? `Check-in: Feeling ${checkIn.mood}` : "No check-in today")
        : "Check-in Sharing Disabled",
      detail: canSeeCheckins
        ? (checkIn.time ? `${completedReminders.length} of ${reminders.length} reminders completed` : `${pendingReminders.length} reminders pending`)
        : "Meera Ji has restricted check-in visibility for this account",
      button: canSeeCheckins ? "View Check-ins" : "Permission Required",
      btnColor: canSeeCheckins ? "bg-noor-saffron-600 hover:bg-noor-saffron-700 text-white" : "bg-stone-200 text-stone-500 cursor-not-allowed",
    },
    {
      id: "events",
      icon: Calendar,
      color: "border-stone-200",
      allowed: true, // Events & Mehfil are open for family coordination & recommendations
      badge: "Social Mehfil",
      title: "Mehfil & Activities",
      stat: myEventList.length > 0 ? `${myEventList.length} Activity Booking(s)` : "No bookings yet",
      detail: myEventList[0] ? myEventList[0].title : "Recommend an activity to Mom",
      button: "Explore Mehfil",
      btnColor: "bg-noor-saffron-600 hover:bg-noor-saffron-700 text-white",
    },
    {
      id: "shield",
      icon: Shield,
      color: pendingShield.length > 0 ? "border-amber-400" : "border-stone-200",
      allowed: canSeeShield,
      badge: "NOOR Shield",
      title: "NOOR Shield Fraud Protection",
      stat: canSeeShield
        ? (pendingShield.length > 0 ? `⚠️ ${pendingShield.length} Awaiting Review` : "All Clear")
        : "Shield Sharing Restricted",
      detail: canSeeShield
        ? (pendingShield.length > 0 ? "Mom explicitly sent a message for your safety review" : "No active alerts")
        : "Shield alerts sharing is disabled by senior",
      button: canSeeShield ? "Review Shield" : "Permission Required",
      btnColor: canSeeShield
        ? (pendingShield.length > 0 ? "bg-amber-600 hover:bg-amber-700 text-white" : "bg-stone-800 hover:bg-stone-900 text-white")
        : "bg-stone-200 text-stone-500 cursor-not-allowed",
    },
  ];

  return (
    <div className="p-5 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-noor-charcoal-900">Good Morning, Aarav! 👋</h1>
        <p className="text-stone-500 font-medium mt-1">Here is how Mom is doing today in Pune.</p>
      </div>

      {/* Senior Profile Summary Card */}
      <div className="bg-white border-2 border-stone-200 rounded-3xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-noor-saffron-100 text-noor-saffron-800 font-bold text-xl flex items-center justify-center shrink-0">
          MS
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-bold text-noor-charcoal-900 text-xl">Meera Sharma</h2>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
              Connected
            </span>
          </div>
          <p className="text-sm text-stone-500 font-medium">Age 68 • Pune, Maharashtra</p>
          <div className="mt-2 text-sm text-stone-700 font-medium">
            {canSeeCheckins ? (
              checkIn.mood ? (
                <span>Last check-in: Today, {checkIn.time} — Feeling {moodIcon(checkIn.mood)} <strong className="capitalize text-stone-900">{checkIn.mood}</strong></span>
              ) : (
                <span className="text-stone-400">No check-in recorded yet today</span>
              )
            ) : (
              <span className="text-stone-400 flex items-center gap-1"><Lock size={14} /> Check-in sharing restricted by senior</span>
            )}
          </div>
        </div>
      </div>

      {/* Four Pillars Grid with Enforced Permission Checks */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-noor-charcoal-900 text-lg">Pillars of Care & Peace of Mind</h2>
        <span className="text-xs text-stone-500 bg-stone-100 px-3 py-1 rounded-full font-medium">
          Permissions Enforced
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.id} className={`bg-white border-2 ${card.color} rounded-3xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden`}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-noor-saffron-50 text-noor-saffron-700 flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider bg-stone-50 text-stone-600 border border-stone-200 px-2.5 py-1 rounded-full">
                    {card.badge}
                  </span>
                </div>
                <h3 className="font-bold text-noor-charcoal-900 text-lg mb-1">{card.title}</h3>
                <p className="font-bold text-stone-800 text-base mb-1">{card.stat}</p>
                <p className="text-sm text-stone-500 mb-5">{card.detail}</p>
              </div>

              <button
                onClick={() => {
                  if (card.allowed) onNavigate(card.id);
                }}
                disabled={!card.allowed}
                className={`w-full py-3 rounded-xl text-sm font-bold transition-colors ${card.btnColor}`}
                style={{ minHeight: "48px" }}
              >
                {card.button}
              </button>
            </div>
          );
        })}
      </div>

      {/* TrustCircle Bar */}
      <div className="bg-white border-2 border-stone-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-bold text-noor-charcoal-900 text-lg">👥 TrustCircle Network</h2>
            <p className="text-sm text-stone-500">Family and trusted neighbours looking out for Mom</p>
          </div>
          <button
            onClick={() => onNavigate("trust")}
            className="text-sm font-bold text-noor-saffron-600 hover:underline"
          >
            Manage Circle →
          </button>
        </div>
        <div className="flex gap-3 flex-wrap mt-4">
          {trustCircle.map((c) => (
            <div key={c.id} className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3">
              <div className="w-9 h-9 rounded-full bg-noor-amber-100 text-noor-amber-800 font-bold text-sm flex items-center justify-center">
                {c.avatar}
              </div>
              <div>
                <p className="text-sm font-bold text-stone-800">{c.name}</p>
                <p className="text-xs text-stone-500">{c.relation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
