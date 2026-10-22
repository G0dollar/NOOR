import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Lock } from "lucide-react";
import Modal from "../../components/shared/Modal";

const VERDICTS = [
  "Potentially Suspicious / Scam",
  "No Obvious Warning Signs Found",
];

export default function FamilyShield({ onBack }) {
  const { shieldMessages, reviewShieldMessage, hasPermission } = useApp();
  const [reviewing, setReviewing] = useState(null);
  const [verdict, setVerdict] = useState("");
  const [note, setNote] = useState("");

  const canSeeShield = hasPermission("shield");

  // Family ONLY reviews messages that the senior explicitly sent (sentToFamily === true)
  const pending = shieldMessages.filter((m) => m.sentToFamily && m.status === "pending");
  const reviewed = shieldMessages.filter((m) => m.sentToFamily && m.status === "reviewed");

  const submitReview = () => {
    if (!verdict) return;
    reviewShieldMessage(reviewing.id, verdict, note);
    setReviewing(null);
    setVerdict("");
    setNote("");
  };

  if (!canSeeShield) {
    return (
      <div className="p-5 md:p-8 max-w-2xl">
        <button onClick={onBack} className="flex items-center gap-2 text-stone-500 mb-5 text-sm font-semibold hover:text-stone-800">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="bg-white border-2 border-stone-200 rounded-3xl p-8 text-center shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-500 flex items-center justify-center mx-auto mb-3">
            <Lock size={24} />
          </div>
          <h2 className="text-xl font-bold text-noor-charcoal-900 mb-2">NOOR Shield Sharing Disabled</h2>
          <p className="text-sm text-stone-600 max-w-md mx-auto">
            Meera Ji has not enabled NOOR Shield alerts sharing with you. When enabled by her in TrustCircle, suspicious messages she sends for review will appear here.
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

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
          <Shield size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-noor-charcoal-900">NOOR Shield • Family Review Desk</h1>
          <p className="text-sm text-stone-500">Messages sent deliberately by Meera Ji for your verification</p>
        </div>
      </div>

      {/* Pending Reviews */}
      {pending.length > 0 ? (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-600" />
            Awaiting Your Review ({pending.length})
          </h2>
          <div className="space-y-4">
            {pending.map((msg) => (
              <div key={msg.id} className={`border-2 rounded-2xl p-5 shadow-sm ${msg.flagged ? "border-amber-400 bg-amber-50" : "border-stone-200 bg-white"}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${msg.flagged ? "text-amber-900" : "text-stone-600"}`}>
                    {msg.flagged ? "⚠️ Warning Signs Flagged" : "🔍 Under Review"}
                  </span>
                  <span className="text-xs text-stone-400">{msg.submittedAt}</span>
                </div>
                <div className="bg-white border border-stone-200 rounded-xl p-3.5 mb-3">
                  <p className="text-sm text-stone-800 font-medium">{msg.text}</p>
                </div>
                {msg.screenshot && (
                  <div className="mb-3">
                    <img src={msg.screenshot} alt="Attached screenshot" className="h-28 rounded-xl border border-stone-200 object-cover" />
                  </div>
                )}
                <button
                  onClick={() => { setReviewing(msg); setVerdict(""); setNote(""); }}
                  className="w-full bg-noor-saffron-600 hover:bg-noor-saffron-700 text-white font-bold py-2.5 rounded-xl text-sm shadow-sm transition-colors"
                  style={{ minHeight: "44px" }}
                >
                  Review & Respond to Mom
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-stone-50 border-2 border-stone-200 rounded-2xl p-6 text-center mb-8">
          <CheckCircle size={32} className="mx-auto text-emerald-600 mb-2" />
          <p className="font-bold text-stone-800 text-sm">No pending messages from Mom right now.</p>
          <p className="text-xs text-stone-500 mt-1">If she encounters a suspicious text or caller, she will send it here.</p>
        </div>
      )}

      {/* Reviewed History */}
      {reviewed.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-3">Previous Reviews</h2>
          <div className="space-y-3">
            {reviewed.map((msg) => (
              <div key={msg.id} className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle size={14} /> Verdict: {msg.familyVerdict}
                  </span>
                  <span className="text-xs text-stone-400">{msg.submittedAt}</span>
                </div>
                <p className="text-sm text-stone-700 mb-2">{msg.text}</p>
                {msg.familyNote && (
                  <p className="text-xs text-stone-500 bg-stone-50 rounded-lg p-2">Note sent: "{msg.familyNote}"</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewing && (
        <Modal
          title="Review Suspicious Message"
          onClose={() => setReviewing(null)}
          footer={
            <>
              <button onClick={() => setReviewing(null)} className="px-4 py-2 text-sm text-stone-500 hover:bg-stone-100 rounded-lg">
                Cancel
              </button>
              <button
                onClick={submitReview}
                disabled={!verdict}
                className={`px-5 py-2 text-sm rounded-xl font-bold ${
                  verdict ? "bg-noor-saffron-600 text-white hover:bg-noor-saffron-700" : "bg-stone-200 text-stone-400 cursor-not-allowed"
                }`}
              >
                Send Verdict to Mom
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="bg-stone-50 rounded-xl p-3 border border-stone-200">
              <p className="text-xs font-bold text-stone-500 mb-1">Message content:</p>
              <p className="text-sm text-stone-800">{reviewing.text}</p>
            </div>
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-2">Your Assessment *</label>
              <div className="space-y-2">
                {VERDICTS.map((v) => (
                  <label key={v} className="flex items-center gap-2 p-3 rounded-xl border border-stone-200 cursor-pointer hover:bg-stone-50">
                    <input
                      type="radio"
                      name="verdict"
                      value={v}
                      checked={verdict === v}
                      onChange={() => setVerdict(v)}
                      className="accent-noor-saffron-600"
                    />
                    <span className="text-sm font-semibold text-stone-800">{v}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Note or Advice for Mom (Optional)</label>
              <textarea
                className="w-full border-2 border-stone-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:border-noor-saffron-500"
                rows={3}
                placeholder="e.g. Mom, this is fake. Please block the sender. I'll pay the bill directly from my portal."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
