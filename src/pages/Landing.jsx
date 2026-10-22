import React from "react";
import { Link } from "react-router-dom";
import { Heart, Shield, Users, Calendar, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { SENIOR, FAMILY } from "../data/seed";

export default function Landing() {
  return (
    <div className="min-h-screen bg-noor-warm flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="bg-white/80 backdrop-blur-md border-b-2 border-stone-200 sticky top-0 z-30 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-3xl font-black text-noor-charcoal-900 tracking-tight">NOOR</span>
            <span className="text-3xl font-black text-noor-saffron-600">.</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/organizer"
              className="text-xs sm:text-sm font-bold text-stone-600 hover:text-noor-saffron-600 transition-colors"
            >
              Host a Mehfil →
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-5 py-10 md:py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-noor-saffron-100 border border-noor-saffron-300 px-4 py-1.5 rounded-full mb-6">
          <Sparkles size={16} className="text-noor-saffron-700" />
          <span className="text-xs sm:text-sm font-bold text-noor-saffron-800">
            India's Dual-Persona Eldercare Platform
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-noor-charcoal-900 leading-tight mb-4 tracking-tight">
          Unki mehfil, <br />
          <span className="text-noor-saffron-600 font-devanagari">aapka bharosa.</span>
        </h1>

        <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          Dignified autonomy for senior parents in India, coupled with transparent, continuous peace of mind for adult children living across the globe.
        </p>

        {/* Dual Mode Entry Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto text-left mb-14">
          {/* Senior Mode Card */}
          <Link
            to="/senior"
            className="group bg-white border-2 border-noor-saffron-200 hover:border-noor-saffron-500 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-noor-saffron-100 text-noor-saffron-700 flex items-center justify-center text-3xl mb-4 group-hover:scale-105 transition-transform">
                🙏
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-noor-saffron-700 bg-noor-saffron-50 px-3 py-1 rounded-full mb-2 inline-block">
                For Parents
              </span>
              <h2 className="text-2xl font-bold text-noor-charcoal-900 mb-1">Senior Mode</h2>
              <p className="text-base text-stone-600 mb-6">
                56px touch buttons, clear contrast, carrom & walks mehfil, medicine reminders, and scam protection.
              </p>
            </div>
            <span className="senior-touch-btn bg-noor-saffron-600 text-white group-hover:bg-noor-saffron-700 text-base shadow-sm gap-2">
              Enter as {SENIOR.name} <ArrowRight size={18} />
            </span>
          </Link>

          {/* Family Mode Card */}
          <Link
            to="/family"
            className="group bg-white border-2 border-stone-200 hover:border-stone-400 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-noor-amber-100 text-noor-amber-800 flex items-center justify-center text-3xl mb-4 group-hover:scale-105 transition-transform">
                🤝
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-600 bg-stone-100 px-3 py-1 rounded-full mb-2 inline-block">
                For Adult Children
              </span>
              <h2 className="text-2xl font-bold text-noor-charcoal-900 mb-1">Family Mode</h2>
              <p className="text-base text-stone-600 mb-6">
                Daily check-in status, permission-safe medical records, fraud alert review, and TrustCircle coordination.
              </p>
            </div>
            <span className="senior-touch-btn bg-stone-900 text-white group-hover:bg-stone-800 text-base shadow-sm gap-2">
              Enter as {FAMILY.name} <ArrowRight size={18} />
            </span>
          </Link>
        </div>

        {/* Four Pillars Feature Highlights */}
        <div className="border-t-2 border-stone-200 pt-12">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-6">
            Engineered Around the Four Pillars of Eldercare
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {[
              { title: "Social Mehfil", desc: "Local carrom, walks, & bhajans", icon: "🎯" },
              { title: "Daily Routine", desc: "Self-reported mood & medicines", icon: "☀️" },
              { title: "NOOR Shield", desc: "Explicit 2-step fraud defense", icon: "🛡️" },
              { title: "Medical Manager", desc: "Permission-enforced records", icon: "📄" },
            ].map((pillar) => (
              <div key={pillar.title} className="bg-white border-2 border-stone-200 rounded-2xl p-4 shadow-xs">
                <span className="text-2xl mb-2 block">{pillar.icon}</span>
                <h4 className="font-bold text-sm text-noor-charcoal-900 mb-0.5">{pillar.title}</h4>
                <p className="text-xs text-stone-500">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-stone-200 bg-white py-6 px-6 text-center text-xs text-stone-500">
        <p className="font-semibold text-stone-700 mb-1">NOOR. — Unki mehfil, aapka bharosa.</p>
        <p>Built as an accessible, installable Progressive Web App (PWA) with React 19 & Tailwind.</p>
      </footer>
    </div>
  );
}
