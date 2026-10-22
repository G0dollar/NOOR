import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ArrowLeft, CheckCircle2, Shield, Calendar, Users, Sparkles, Building2, AlertCircle } from "lucide-react";

const CATEGORIES = [
  "Morning Walks",
  "Carrom",
  "Yoga",
  "Bhajans",
  "Music",
  "Gardening",
  "Social Gatherings",
  "Hobby Classes",
  "Premium Trips",
];

export default function OrganizerPage() {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [form, setForm] = useState({
    host: "",
    title: "",
    category: "Carrom",
    location: "",
    date: "",
    time: "",
    capacity: "",
    type: "Free",
    description: "",
    guidelinesAccepted: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.host || !form.title || !form.location || !form.date || !form.guidelinesAccepted) {
      showToast("Please fill in all mandatory fields and accept safety guidelines.", "error");
      return;
    }
    setSubmitted(true);
    showToast("Event submitted! Placed under community curation review.");
  };

  return (
    <div className="min-h-screen bg-noor-warm">
      {/* Demo Top Banner */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 flex items-center justify-between">
        <span className="font-semibold text-noor-amber-400">
          🛠 DEMO MODE — Verified Organizer & Community Portal
        </span>
        <div className="flex gap-4">
          <Link to="/" className="text-stone-400 hover:text-white">
            Return to Landing
          </Link>
        </div>
      </div>

      <header className="bg-white border-b-2 border-stone-200 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1">
          <span className="text-2xl font-black text-noor-charcoal-900 tracking-tight">NOOR</span>
          <span className="text-2xl font-black text-noor-saffron-600">.</span>
        </Link>
        <span className="text-xs bg-stone-100 text-stone-700 font-bold px-3 py-1 rounded-full border border-stone-200 uppercase tracking-wider">
          Organizer Portal
        </span>
      </header>

      <main className="max-w-2xl mx-auto p-5 md:p-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-stone-500 mb-6 text-sm font-semibold hover:text-stone-800"
        >
          <ArrowLeft size={16} /> Back to Landing Page
        </Link>

        {submitted ? (
          <div className="bg-white border-2 border-emerald-300 rounded-3xl p-8 text-center shadow-sm">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={36} />
            </div>
            <h1 className="text-2xl font-bold text-noor-charcoal-900 mb-2">
              Event Submitted for NOOR Curation Review
            </h1>
            <p className="text-base text-stone-600 mb-6 max-w-lg mx-auto">
              Thank you, <strong>{form.host}</strong>. To safeguard our seniors from spam, unverified gatherings, and commercial exploitation, all submissions undergo manual safety verification.
            </p>
            <div className="bg-noor-amber-50 border border-noor-amber-200 rounded-2xl p-4 text-left mb-6 text-sm text-amber-900 space-y-1">
              <p className="font-bold">✓ Event: {form.title} ({form.category})</p>
              <p>📍 Location: {form.location}</p>
              <p>🗓 Date & Time: {form.date} at {form.time || "TBD"}</p>
              <p className="text-xs text-stone-500 mt-2">
                Status: Pending Community Moderator Review (Avg turnaround: 4-6 hours).
              </p>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({
                  host: "",
                  title: "",
                  category: "Carrom",
                  location: "",
                  date: "",
                  time: "",
                  capacity: "",
                  type: "Free",
                  description: "",
                  guidelinesAccepted: false,
                });
              }}
              className="px-6 py-3 bg-noor-saffron-600 text-white font-bold rounded-xl hover:bg-noor-saffron-700"
            >
              Submit Another Gathering
            </button>
          </div>
        ) : (
          <div className="bg-white border-2 border-stone-200 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-noor-charcoal-900">
                Host a Senior Mehfil Gathering
              </h1>
              <p className="text-base text-stone-500 mt-1">
                Bring seniors together for carrom, morning walks, yoga, music, or cultural chai meetups.
              </p>
            </div>

            {/* Platform Non-Auto Publish Disclaimer */}
            <div className="bg-noor-amber-50 border-2 border-noor-amber-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
              <Shield size={22} className="text-noor-saffron-600 mt-0.5 shrink-0" />
              <div className="text-xs text-amber-900 space-y-1">
                <p className="font-bold text-sm text-stone-900">Safety First Curation Policy</p>
                <p>
                  Events are <strong>not auto-published</strong>. All activities are vetted by the NOOR safety board to ensure elder accessibility, seating comfort, wheelchair access, and zero aggressive financial solicitation.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-bold text-stone-800 block mb-1">
                  Organizer / Host Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Deshpande (Pune Senior Club)"
                  value={form.host}
                  onChange={(e) => setForm({ ...form, host: e.target.value })}
                  className="w-full border-2 border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-noor-saffron-500"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-stone-800 block mb-1">
                  Gathering Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunday Carrom & Chai Circle"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border-2 border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-noor-saffron-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-stone-800 block mb-1">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border-2 border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-noor-saffron-500 bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-bold text-stone-800 block mb-1">
                    Gathering Type *
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full border-2 border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-noor-saffron-500 bg-white"
                  >
                    <option value="Free">Free Community Gathering</option>
                    <option value="Premium">Curated Workshop / Trip</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-stone-800 block mb-1">
                  Venue / Location in City *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Viman Nagar Community Hall, Pune"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full border-2 border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-noor-saffron-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-bold text-stone-800 block mb-1">
                    Date *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunday, Oct 25"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full border-2 border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-noor-saffron-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-stone-800 block mb-1">
                    Time *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5:00 PM"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full border-2 border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-noor-saffron-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-stone-800 block mb-1">
                    Max Capacity
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 12"
                    value={form.capacity}
                    onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                    className="w-full border-2 border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-noor-saffron-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-stone-800 block mb-1">
                  Brief Description & Seating Amenities
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the activity, seating comfort, shade, and accessibility details for seniors..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border-2 border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-noor-saffron-500 resize-none"
                />
              </div>

              <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={form.guidelinesAccepted}
                  onChange={(e) => setForm({ ...form, guidelinesAccepted: e.target.checked })}
                  className="mt-1 w-4 h-4 accent-noor-saffron-600 rounded"
                />
                <span className="text-xs text-stone-700 leading-relaxed">
                  I agree to NOOR's Elder Safety & Accessibility Standards. The gathering will not engage in financial product pitching, pyramid schemes, or unverified medicine sales.
                </span>
              </label>

              <button
                type="submit"
                className="w-full bg-noor-saffron-600 hover:bg-noor-saffron-700 text-white font-bold py-3.5 rounded-xl text-base shadow-sm transition-colors"
                style={{ minHeight: "52px" }}
              >
                Submit Event for Safety Review
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
