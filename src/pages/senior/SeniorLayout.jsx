import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Calendar, Users, HelpCircle, ArrowLeft } from "lucide-react";
import SeniorHome from "./SeniorHome";
import SeniorHealth from "./SeniorHealth";
import SeniorMyDay from "./SeniorMyDay";
import SeniorEvents from "./SeniorEvents";
import SeniorShield from "./SeniorShield";
import SeniorTrustCircle from "./SeniorTrustCircle";
import Toast from "../../components/shared/Toast";

const NAV = [
  { id: "home", label: "Home", icon: Home },
  { id: "events", label: "Mehfil", icon: Calendar },
  { id: "trust", label: "My People", icon: Users },
  { id: "help", label: "Help", icon: HelpCircle },
];

export default function SeniorLayout() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState("home");

  const renderScreen = () => {
    switch (screen) {
      case "home": return <SeniorHome onNavigate={setScreen} />;
      case "health": return <SeniorHealth onBack={() => setScreen("home")} />;
      case "myday": return <SeniorMyDay onBack={() => setScreen("home")} />;
      case "events": return <SeniorEvents onBack={() => setScreen("home")} />;
      case "shield": return <SeniorShield onBack={() => setScreen("home")} />;
      case "trust": return <SeniorTrustCircle onBack={() => setScreen("home")} />;
      case "help": return <SeniorHelp onBack={() => setScreen("home")} />;
      default: return <SeniorHome onNavigate={setScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-noor-warm flex flex-col max-w-md mx-auto md:max-w-2xl">
      {/* Demo Switcher Banner with real URLs */}
      <div className="bg-noor-amber-100 border-b border-noor-amber-200 text-stone-800 text-xs py-2 px-4 flex items-center justify-between">
        <span className="font-semibold">🛠 DEMO MODE — Fictional Prototype</span>
        <div className="flex gap-3">
          <Link to="/family" className="text-noor-saffron-700 font-bold hover:underline">
            → Family Mode
          </Link>
          <Link to="/" className="text-stone-600 hover:underline">
            Exit
          </Link>
        </div>
      </div>

      {/* Senior Top Header */}
      <header className="bg-white border-b-2 border-stone-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <Link to="/" className="flex items-center gap-1">
          <span className="text-2xl font-black text-noor-charcoal-900 tracking-tight">NOOR</span>
          <span className="text-2xl font-black text-noor-saffron-600">.</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-noor-saffron-100 text-noor-saffron-800 border border-noor-saffron-300 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            Senior Mode
          </span>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 overflow-y-auto pb-28">
        {renderScreen()}
      </main>

      {/* Senior Bottom Navigation with guaranteed 64px touch target */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-stone-200 z-30 max-w-md mx-auto md:max-w-2xl bottom-nav-safe shadow-lg">
        <div className="flex">
          {NAV.map(({ id, label, icon: Icon }) => {
            const active = screen === id;
            return (
              <button
                key={id}
                onClick={() => setScreen(id)}
                className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-colors ${
                  active ? "text-noor-saffron-600 font-bold" : "text-stone-400 hover:text-stone-600 font-medium"
                }`}
                style={{ minHeight: "64px" }}
              >
                <Icon size={24} strokeWidth={active ? 2.5 : 2} />
                <span className="text-xs">{label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <Toast />
    </div>
  );
}

function SeniorHelp({ onBack }) {
  return (
    <div className="p-5 md:p-6 max-w-lg mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-stone-600 mb-5 text-base font-semibold"
        style={{ minHeight: "44px" }}
      >
        <ArrowLeft size={20} /> Back to Home
      </button>
      <h2 className="text-2xl font-bold text-noor-charcoal-900 mb-2">Help & Family Assistance</h2>
      <p className="text-base text-stone-500 mb-6">Need assistance? Your family Aarav is connected with you.</p>
      <div className="space-y-4">
        {[
          { q: "How do I add a medicine reminder?", a: "Go to 'My Day' from the home screen and tap the '+ Add' button." },
          { q: "How do I share health reports with Aarav?", a: "Open 'My Health', click on any prescription or report, and toggle the 'Share' switch." },
          { q: "How does NOOR Shield protect me?", a: "If you receive a suspicious SMS, WhatsApp message, or call, paste it into NOOR Shield. You can scan it and choose to send it to Aarav for review before clicking any links." },
          { q: "How do I join a Carrom or Walk Mehfil?", a: "Tap 'Mehfil' in the bottom menu, browse available nearby activities in Pune, and tap 'Join Mehfil Activity'." },
        ].map((item) => (
          <div key={item.q} className="bg-white border-2 border-stone-200 rounded-2xl p-5 shadow-sm">
            <p className="font-bold text-noor-charcoal-900 text-lg mb-2">❓ {item.q}</p>
            <p className="text-stone-700 text-base">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
