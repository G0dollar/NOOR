import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Shield,
  FileText,
  Users,
  CheckCircle,
  Menu,
  X,
  Heart,
  ChevronRight,
} from "lucide-react";
import FamilyHome from "./FamilyHome";
import FamilyHealth from "./FamilyHealth";
import FamilyCheckins from "./FamilyCheckins";
import FamilyEvents from "./FamilyEvents";
import FamilyShield from "./FamilyShield";
import FamilyTrustCircle from "./FamilyTrustCircle";
import Toast from "../../components/shared/Toast";

const NAV = [
  { id: "home", label: "Dashboard", icon: LayoutDashboard },
  { id: "checkins", label: "Daily Wellbeing", icon: CheckCircle },
  { id: "health", label: "Medical Manager", icon: FileText },
  { id: "shield", label: "NOOR Shield", icon: Shield },
  { id: "events", label: "Mehfil Activities", icon: Calendar },
  { id: "trust", label: "TrustCircle", icon: Users },
];

export default function FamilyLayout() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState("home");
  const [mobileMenu, setMobileMenu] = useState(false);

  const renderScreen = () => {
    switch (screen) {
      case "home": return <FamilyHome onNavigate={setScreen} />;
      case "health": return <FamilyHealth onBack={() => setScreen("home")} />;
      case "checkins": return <FamilyCheckins onBack={() => setScreen("home")} />;
      case "events": return <FamilyEvents onBack={() => setScreen("home")} />;
      case "shield": return <FamilyShield onBack={() => setScreen("home")} />;
      case "trust": return <FamilyTrustCircle onBack={() => setScreen("home")} />;
      default: return <FamilyHome onNavigate={setScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-noor-warm flex flex-col">
      {/* Demo Switcher Banner with real URLs */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 flex items-center justify-between">
        <span className="font-semibold text-noor-amber-400">
          🛠 DEMO MODE — Viewing as Aarav Sharma (Son)
        </span>
        <div className="flex gap-4">
          <Link to="/senior" className="text-noor-saffron-500 font-bold hover:underline">
            → Senior Mode (Meera Ji)
          </Link>
          <Link to="/" className="text-stone-400 hover:text-white">
            Landing Page
          </Link>
        </div>
      </div>

      {/* Top Header */}
      <header className="bg-white border-b-2 border-stone-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden text-stone-600 p-1"
          >
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Link to="/" className="flex items-center gap-1">
            <span className="text-2xl font-black text-noor-charcoal-900 tracking-tight">NOOR</span>
            <span className="text-2xl font-black text-noor-saffron-600">.</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-stone-500 font-medium">Viewing Care Dashboard</p>
            <p className="text-sm font-bold text-noor-charcoal-900">Meera Sharma (Mom)</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-noor-saffron-100 text-noor-saffron-800 font-bold text-sm flex items-center justify-center">
            AS
          </div>
        </div>
      </header>

      {/* Body: Sidebar on Desktop + Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden md:block w-64 border-r-2 border-stone-200 bg-white p-5 space-y-2 shrink-0">
          <div className="pb-4 mb-3 border-b border-stone-100">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1">
              Family Guardian Portal
            </span>
            <p className="text-sm font-bold text-noor-charcoal-900">Unki mehfil, aapka bharosa.</p>
          </div>

          {NAV.map(({ id, label, icon: Icon }) => {
            const active = screen === id;
            return (
              <button
                key={id}
                onClick={() => setScreen(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-colors ${
                  active
                    ? "bg-noor-saffron-600 text-white shadow-sm"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`}
                style={{ minHeight: "48px" }}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            );
          })}
        </aside>

        {/* Mobile Flyout Menu */}
        {mobileMenu && (
          <div className="md:hidden fixed inset-0 top-24 bg-stone-900/40 backdrop-blur-sm z-40 p-4">
            <div className="bg-white rounded-3xl p-5 space-y-2 shadow-xl">
              {NAV.map(({ id, label, icon: Icon }) => {
                const active = screen === id;
                return (
                  <button
                    key={id}
                    onClick={() => {
                      setScreen(id);
                      setMobileMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-bold transition-colors ${
                      active ? "bg-noor-saffron-600 text-white" : "text-stone-700 hover:bg-stone-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} />
                      <span>{label}</span>
                    </div>
                    <ChevronRight size={16} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-16">
          {renderScreen()}
        </main>
      </div>

      <Toast />
    </div>
  );
}
