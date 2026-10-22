import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { ArrowLeft, Users, MessageSquare, Check, X, ShieldAlert } from "lucide-react";
import Modal from "../../components/shared/Modal";
import { TRUSTED_CONTACT } from "../../data/seed";

export default function FamilyTrustCircle({ onBack }) {
  const { trustCircle, assistanceRequests, requestAssistance, respondAssistance } = useApp();
  const [requesting, setRequesting] = useState(null);
  const [message, setMessage] = useState("");

  const handleRequest = () => {
    if (!message.trim()) return;
    requestAssistance(requesting.id, message);
    setRequesting(null);
    setMessage("");
  };

  return (
    <div className="p-5 md:p-8 max-w-2xl">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-stone-500 mb-5 text-sm font-semibold hover:text-stone-800"
        style={{ minHeight: "auto" }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-noor-saffron-100 flex items-center justify-center text-noor-saffron-600">
          <Users size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-noor-charcoal-900">TrustCircle Coordination</h1>
          <p className="text-sm text-stone-500">Meera Ji's trusted contacts & local assistance network</p>
        </div>
      </div>

      {/* TrustCircle Contacts List */}
      <div className="space-y-4 mb-8">
        {trustCircle.map((contact) => {
          const contactRequests = assistanceRequests.filter((r) => r.contactId === contact.id);
          const pending = contactRequests.filter((r) => r.status === "pending");
          return (
            <div key={contact.id} className="bg-white border-2 border-stone-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-noor-amber-100 text-noor-amber-800 font-bold text-base flex items-center justify-center shrink-0">
                  {contact.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-base text-noor-charcoal-900">{contact.name}</h3>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                      contact.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {contact.status}
                    </span>
                  </div>
                  <p className="text-sm text-stone-500 font-medium mb-3">{contact.relation}</p>
                  
                  <div className="mb-2">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
                      Permissions Allowed by Meera Ji:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(contact.permissions || []).map((p) => (
                        <span key={p} className="text-xs bg-stone-100 text-stone-700 font-semibold border border-stone-200 px-2.5 py-1 rounded-lg capitalize">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  {pending.length > 0 && (
                    <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5 mt-2 font-medium">
                      ⏳ {pending.length} assistance request pending contact response
                    </p>
                  )}
                </div>
              </div>

              {contact.status === "active" && contact.relation !== "Son" && (
                <button
                  onClick={() => { setRequesting(contact); setMessage(""); }}
                  className="w-full mt-4 border border-noor-saffron-300 text-noor-saffron-700 bg-noor-saffron-50 hover:bg-noor-saffron-100 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                  style={{ minHeight: "44px" }}
                >
                  <MessageSquare size={16} /> Request Non-urgent Help (e.g. Check on Mom)
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Assistance Requests Section & Trusted Contact Simulation Bar */}
      {assistanceRequests.length > 0 && (
        <div className="border-t border-stone-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-noor-charcoal-900 text-base">Assistance Requests Status</h2>
            <span className="text-xs bg-noor-amber-100 text-noor-amber-800 px-2.5 py-1 rounded-full font-bold">
              Trusted Contact Response Simulator
            </span>
          </div>

          <div className="space-y-3">
            {assistanceRequests.map((req) => {
              const contact = trustCircle.find((c) => c.id === req.contactId);
              return (
                <div key={req.id} className="bg-white border-2 border-stone-200 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-bold text-noor-charcoal-900">
                      Dispatched to: {contact?.name || "Trusted Contact"}
                    </p>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                      req.status === "pending" ? "bg-amber-100 text-amber-800"
                        : req.status === "accepted" ? "bg-emerald-100 text-emerald-800"
                        : "bg-rose-100 text-rose-800"
                    }`}>
                      {req.status}
                    </span>
                  </div>
                  <p className="text-sm text-stone-700 bg-stone-50 border border-stone-200 rounded-xl p-3 mb-3">
                    "{req.message}"
                  </p>

                  {/* Trusted Contact responds (Anita Kulkarni / Contact's Perspective) */}
                  {req.status === "pending" && (
                    <div className="bg-noor-amber-50 border border-noor-amber-200 rounded-xl p-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-900">
                          Demo Playground • Trusted Contact Response
                        </span>
                      </div>
                      <div className="flex gap-2 w-full pt-1">
                        <button
                          onClick={() => respondAssistance(req.id, "accepted")}
                          className="flex-1 text-xs bg-noor-emerald hover:bg-noor-emerald-700 text-white font-bold px-3 py-2 rounded-xl flex items-center justify-center gap-1 shadow-xs"
                        >
                          <Check size={14} /> Simulate {contact?.name || "Contact"} Accepting
                        </button>
                        <button
                          onClick={() => respondAssistance(req.id, "declined")}
                          className="flex-1 text-xs bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold px-3 py-2 rounded-xl flex items-center justify-center gap-1"
                        >
                          <X size={14} /> Simulate Declining
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Request Modal */}
      {requesting && (
        <Modal
          title={`Request Assistance from ${requesting.name}`}
          onClose={() => setRequesting(null)}
          footer={
            <>
              <button
                onClick={() => setRequesting(null)}
                className="px-4 py-2 text-sm text-stone-500 hover:bg-stone-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleRequest}
                disabled={!message.trim()}
                className={`px-5 py-2 text-sm rounded-xl font-bold ${
                  message.trim() ? "bg-noor-saffron-600 text-white hover:bg-noor-saffron-700" : "bg-stone-200 text-stone-400 cursor-not-allowed"
                }`}
              >
                Send Request
              </button>
            </>
          }
        >
          <div className="space-y-3">
            <p className="text-xs text-stone-500">
              This sends a polite non-urgent note. The contact ({requesting.name}) will receive it and can accept or decline.
            </p>
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Your Message</label>
              <textarea
                className="w-full border-2 border-stone-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:border-noor-saffron-500"
                rows={4}
                placeholder="e.g. Namaste Anita Ji, could you please check in on Mom this evening around 6 PM?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
