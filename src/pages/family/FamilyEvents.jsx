import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Modal from "../../components/shared/Modal";

const CATEGORIES = ["All", "Morning Walks", "Carrom", "Yoga", "Bhajans", "Hobby Classes", "Gardening", "Social"];

export default function FamilyEvents({ onBack }) {
  const { events, myBookings, recommendedEvents, recommendEvent } = useApp();
  const [category, setCategory] = useState("All");
  const [tab, setTab] = useState("browse");

  const filtered = category === "All" ? events : events.filter((e) => e.category === category);
  const myEventList = events.filter((e) => myBookings.includes(e.id));

  return (
    <div className="p-5 md:p-8 max-w-3xl">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 mb-5 text-sm" style={{ minHeight: "auto" }}>
        <ArrowLeft size={16} /> Back
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-1">Events & Activities</h1>
      <p className="text-sm text-gray-500 mb-4">Discover events to recommend to Meera Ji</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 border-b border-gray-200">
        {["browse", "mom"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 text-sm font-semibold border-b-2 mr-2 transition-colors ${
              tab === t ? "border-blue-500 text-blue-600" : "border-transparent text-gray-400"
            }`}
            style={{ minHeight: "auto" }}
          >
            {t === "browse" ? "Browse All" : `Mom's Bookings (${myBookings.length})`}
          </button>
        ))}
      </div>

      {tab === "browse" && (
        <>
          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  category === c ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200"
                }`}
                style={{ minHeight: "auto" }}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filtered.map((evt) => {
              const isRecommended = recommendedEvents.includes(evt.id);
              const isBooked = myBookings.includes(evt.id);
              return (
                <div key={evt.id} className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{evt.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <h3 className="font-semibold text-gray-900">{evt.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          evt.type === "Premium" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
                        }`}>
                          {evt.type}
                        </span>
                        {isBooked && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">Mom Booked ✓</span>}
                      </div>
                      <p className="text-xs text-gray-500">{evt.location} · {evt.date}</p>
                      <p className="text-xs text-gray-500">Host: {evt.host} · {evt.seats - evt.bookedSeats} seats left</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    {isRecommended ? (
                      <div className="flex items-center gap-2 text-green-600 text-sm">
                        <CheckCircle size={15} /> Recommended to Mom
                      </div>
                    ) : (
                      <button
                        onClick={() => recommendEvent(evt.id)}
                        className="w-full bg-blue-50 text-blue-700 border border-blue-200 py-2 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors"
                        style={{ minHeight: 44 }}
                      >
                        📨 Recommend to Mom
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {tab === "mom" && (
        <div className="space-y-4">
          {myEventList.length === 0 ? (
            <p className="text-center text-gray-400 py-10 text-sm">Mom hasn't booked any events yet. Recommend one!</p>
          ) : (
            myEventList.map((evt) => (
              <div key={evt.id} className="bg-white border border-green-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{evt.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-0.5">{evt.title}</h3>
                    <p className="text-xs text-gray-500">{evt.location} · {evt.date}</p>
                    <p className="text-xs text-green-600 mt-1 font-medium">✓ Booked by Meera Ji</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
