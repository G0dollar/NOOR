import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { ArrowLeft, Shield, AlertTriangle, Info, Send, CheckCircle2, Image as ImageIcon } from "lucide-react";

export default function SeniorShield({ onBack }) {
  const { shieldMessages, scanShieldMessage, sendShieldMessageToFamily } = useApp();
  const [text, setText] = useState("");
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [activeMessage, setActiveMessage] = useState(null);
  const [tab, setTab] = useState("submit");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = () => {
    if (!text.trim() && !screenshotPreview) return;
    const result = scanShieldMessage(text, screenshotPreview);
    setActiveMessage(result);
    setText("");
    setScreenshotPreview(null);
  };

  const handleSendToFamily = (id) => {
    sendShieldMessageToFamily(id);
    setTab("history");
    setActiveMessage(null);
  };

  return (
    <div className="p-5 md:p-6 max-w-lg mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-stone-600 mb-5 text-base font-semibold"
        style={{ minHeight: "44px" }}
      >
        <ArrowLeft size={20} /> Back to Home
      </button>

      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-2xl bg-noor-saffron-100 flex items-center justify-center text-noor-saffron-600">
          <Shield size={28} />
        </div>
        <div>
          <h1 className="text-2xl md:text-senior-xl font-bold text-noor-charcoal-900">Stay Safe</h1>
          <p className="text-base text-stone-500 font-medium">NOOR Shield • Scam & Fraud Detection</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-stone-200 mt-5">
        <button
          onClick={() => { setTab("submit"); setActiveMessage(null); }}
          className={`pb-3 text-lg font-bold border-b-2 transition-colors ${
            tab === "submit" ? "border-noor-saffron-600 text-noor-saffron-600" : "border-transparent text-stone-400"
          }`}
          style={{ minHeight: "48px" }}
        >
          Check a Message
        </button>
        <button
          onClick={() => setTab("history")}
          className={`pb-3 text-lg font-bold border-b-2 transition-colors ${
            tab === "history" ? "border-noor-saffron-600 text-noor-saffron-600" : "border-transparent text-stone-400"
          }`}
          style={{ minHeight: "48px" }}
        >
          History ({shieldMessages.length})
        </button>
      </div>

      {tab === "submit" && !activeMessage && (
        <div className="space-y-5">
          <div className="bg-noor-amber-50 border border-noor-amber-200 rounded-2xl p-5 text-center">
            <Shield size={44} className="mx-auto text-noor-saffron-600 mb-2" />
            <h2 className="font-bold text-noor-charcoal-900 text-senior-base mb-1">
              Not sure about a message?
            </h2>
            <p className="text-base text-stone-600">
              Paste the text or upload a screenshot to check for safety before clicking or replying.
            </p>
          </div>

          <div>
            <label className="text-base font-bold text-noor-charcoal-900 block mb-2">
              Message text received:
            </label>
            <textarea
              className="w-full border-2 border-stone-300 rounded-2xl px-4 py-3.5 text-senior-base text-stone-900 focus:outline-none focus:border-noor-saffron-600 resize-none bg-white placeholder:text-stone-400"
              rows={4}
              placeholder="e.g. Your electricity will be cut off tonight, click here to pay immediately..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div>
            <label className="text-base font-bold text-noor-charcoal-900 block mb-2">
              Attach Screenshot (optional):
            </label>
            <label className="flex items-center justify-center gap-3 border-2 border-dashed border-stone-300 hover:border-noor-saffron-500 rounded-2xl p-4 bg-white cursor-pointer transition-colors" style={{ minHeight: "56px" }}>
              <ImageIcon size={24} className="text-stone-400" />
              <span className="text-base font-semibold text-stone-700">
                {screenshotPreview ? "Screenshot Selected ✓" : "Upload Screenshot from Phone"}
              </span>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            {screenshotPreview && (
              <div className="mt-3 relative inline-block">
                <img src={screenshotPreview} alt="Screenshot preview" className="h-28 rounded-xl border border-stone-300 object-cover" />
                <button
                  type="button"
                  onClick={() => setScreenshotPreview(null)}
                  className="absolute -top-2 -right-2 bg-stone-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleScan}
            disabled={!text.trim() && !screenshotPreview}
            className={`w-full senior-touch-btn ${
              text.trim() || screenshotPreview
                ? "bg-noor-saffron-600 text-white hover:bg-noor-saffron-700 shadow-md"
                : "bg-stone-200 text-stone-400 cursor-not-allowed"
            }`}
          >
            🔍 Analyze Message
          </button>

          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <Info size={22} className="text-noor-saffron-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-base font-bold text-noor-charcoal-900 mb-1">Golden Safety Rules:</p>
                <ul className="text-base text-stone-700 space-y-1 list-disc list-inside">
                  <li>Never share OTP, passwords, or bank PINs with anyone.</li>
                  <li>Banks and electric boards never ask for immediate wire transfers.</li>
                  <li>When in doubt, ask your family via NOOR first.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Explicit Step 2: Analysis Result with deliberate "Send to Family" step */}
      {tab === "submit" && activeMessage && (
        <div className="space-y-5">
          <div className={`border-2 rounded-2xl p-5 ${activeMessage.flagged ? "border-amber-400 bg-amber-50" : "border-stone-200 bg-white"}`}>
            <div className="flex items-center gap-2 mb-3">
              {activeMessage.flagged ? (
                <>
                  <AlertTriangle size={24} className="text-amber-600" />
                  <h3 className="text-lg font-bold text-amber-900">Warning Signs Detected</h3>
                </>
              ) : (
                <>
                  <Info size={24} className="text-blue-600" />
                  <h3 className="text-lg font-bold text-blue-900">No Immediate Warning Words Found</h3>
                </>
              )}
            </div>

            <p className="text-base text-stone-800 bg-white border border-stone-200 rounded-xl p-3 mb-4 italic">
              "{activeMessage.text}"
            </p>

            {activeMessage.flagged ? (
              <p className="text-base text-amber-900 mb-4">
                <strong>Caution:</strong> This message includes high-risk phrases (e.g. urgent action, bank/account warning, or OTP requests).
              </p>
            ) : (
              <p className="text-base text-stone-700 mb-4">
                While automated checks did not find immediate red flags, fraudsters constantly change wording. 
              </p>
            )}

            <div className="pt-2 border-t border-stone-200">
              <p className="text-base font-bold text-noor-charcoal-900 mb-3">
                Would you like to send this to your family for review?
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleSendToFamily(activeMessage.id)}
                  className="w-full senior-touch-btn bg-noor-saffron-600 text-white hover:bg-noor-saffron-700 gap-2 shadow-md"
                >
                  <Send size={20} /> Yes, Send to Family for Review
                </button>
                <button
                  onClick={() => setActiveMessage(null)}
                  className="w-full senior-touch-btn bg-stone-100 text-stone-700 hover:bg-stone-200"
                >
                  No, I'll Delete It Myself
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "history" && (
        <div className="space-y-4">
          {shieldMessages.length === 0 ? (
            <p className="text-center text-stone-400 py-12 text-base">No messages submitted yet.</p>
          ) : (
            shieldMessages.map((msg) => (
              <div key={msg.id} className="bg-white border-2 border-stone-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-stone-500">Checked at {msg.submittedAt}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                    msg.status === "reviewed"
                      ? "bg-green-100 text-green-800"
                      : msg.sentToFamily
                      ? "bg-amber-100 text-amber-800"
                      : "bg-stone-100 text-stone-600"
                  }`}>
                    {msg.status === "reviewed" ? "Reviewed by Family" : msg.sentToFamily ? "Sent to Family" : "Local Scan Only"}
                  </span>
                </div>
                <p className="text-base text-stone-800 font-medium mb-3">{msg.text}</p>
                {msg.screenshot && (
                  <div className="mb-3">
                    <img src={msg.screenshot} alt="Attached screenshot" className="h-24 rounded-lg border border-stone-200 object-cover" />
                  </div>
                )}
                {msg.status === "reviewed" && (
                  <div className="bg-noor-amber-50 border border-noor-amber-200 rounded-xl p-3 text-base">
                    <p className="font-bold text-noor-charcoal-900 flex items-center gap-1.5">
                      <CheckCircle2 size={18} className="text-green-600" /> Family Verdict: {msg.familyVerdict}
                    </p>
                    {msg.familyNote && <p className="text-stone-600 mt-1">{msg.familyNote}</p>}
                  </div>
                )}
                {!msg.sentToFamily && msg.status !== "reviewed" && (
                  <button
                    onClick={() => handleSendToFamily(msg.id)}
                    className="w-full mt-2 senior-touch-btn bg-noor-saffron-600 text-white hover:bg-noor-saffron-700 text-base"
                    style={{ minHeight: "48px" }}
                  >
                    Send to Family for Review
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
