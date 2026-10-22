import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Calendar, MapPin, Users, CheckCircle, ArrowLeft } from "lucide-react";

const CATEGORIES = ["All", "Carrom", "Morning Walks", "Bhajans", "Yoga", "Gardening", "Hobby Classes"];

export default function SeniorEvents({ onBack }) {
  const { events, myBookings, bookEvent, cancelBooking } = useApp();
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? events : events.filter((e) => e.category === filter);
  const myEvents = events.filter((e) => myBookings.includes(e.id));

  return (
    <div className="p-5 md:p-6 max-w-lg mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-stone-600 mb-5 text-base font-semibold"
        style={{ minHeight: "44px" }}
      >
        <ArrowLeft size={20} /> Back to Home
      </button>

      <div className="mb-6">
        <h1 className="text-2xl md:text-senior-xl font-bold text-noor-charcoal-900">🎯 Mehfil Activities</h1>
        <p className="text-base text-stone-500 font-medium">Meet friends, play carrom, and stay active</p>
      </div>

      {/* Booked Events Section */}
      {myEvents.length > 0 && (
        <div className="mb-8">
          <h2 className="text-senior-base font-bold text-noor-charcoal-900 mb-3 flex items-center gap-2">
            <CheckCircle size={22} className="text-emerald-600" /> My Joined Activities ({myEvents.length})
          </h2>
          <div className="space-y-4">
            {myEvents.map((evt) => (
              <div key={evt.id} className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-5 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{evt.emoji}</span>
                    <div>
                      <h3 className="font-bold text-lg text-emerald-950">{evt.title}</h3>
                      <p className="text-base text-emerald-800 font-medium">{evt.date}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-200 text-emerald-900 px-3 py-1 rounded-full font-bold uppercase">
                    Joined ✓
                  </span>
                </div>
                <p className="text-base text-emerald-800 flex items-center gap-1.5 mt-2">
                  <MapPin size={18} /> {evt.location}
                </p>
                <button
                  onClick={() => cancelBooking(evt.id)}
                  className="w-full mt-4 senior-touch-btn bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-100 text-base"
                  style={{ minHeight: "48px" }}
                >
                  Cancel Registration
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-2xl text-base font-bold border-2 transition-colors ${
              filter === cat
                ? "bg-noor-saffron-600 text-white border-noor-saffron-600 shadow-sm"
                : "bg-white text-stone-700 border-stone-200 hover:border-stone-300"
            }`}
            style={{ minHeight: "48px" }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filtered.map((evt) => {
          const isBooked = myBookings.includes(evt.id);
          const isFull = evt.bookedSeats >= evt.seats;
          return (
            <div key={evt.id} className="bg-white border-2 border-stone-200 rounded-3xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-3xl">{evt.emoji}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                    evt.type === "Free" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-noor-amber-50 text-noor-amber-800 border border-noor-amber-200"
                  }`}>
                    {evt.type}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-noor-charcoal-900 mb-1">{evt.title}</h3>
                <p className="text-base text-noor-saffron-700 font-bold mb-1">{evt.date}</p>
                <p className="text-base text-stone-500 font-medium flex items-center gap-1.5 mb-2">
                  <MapPin size={18} /> {evt.location}
                </p>
                <p className="text-sm text-stone-600 mb-4">Host: {evt.host} • Seats: {evt.bookedSeats}/{evt.seats}</p>
              </div>

              {isBooked ? (
                <div className="text-center py-2 text-emerald-700 font-bold text-base flex items-center justify-center gap-1.5">
                  <CheckCircle size={18} /> You are registered for this event
                </div>
              ) : (
                <button
                  onClick={() => bookEvent(evt.id)}
                  disabled={isFull}
                  className={`w-full senior-touch-btn ${
                    isFull
                      ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                      : "bg-noor-saffron-600 text-white hover:bg-noor-saffron-700 shadow-md"
                  }`}
                >
                  {isFull ? "Activity Full" : "Join Mehfil Activity"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
