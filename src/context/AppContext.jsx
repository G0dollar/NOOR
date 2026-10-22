import React, { createContext, useContext, useState, useEffect } from "react";
import {
  INITIAL_DOCUMENTS,
  INITIAL_REMINDERS,
  INITIAL_EVENTS,
  INITIAL_TRUST_CIRCLE,
  SENIOR,
  FAMILY,
} from "../data/seed";

const AppContext = createContext(null);

const load = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

export function AppProvider({ children }) {
  // Current active user identity for permissions evaluation: contact ID in TrustCircle (defaults to Aarav Sharma: "tc-1")
  const [activeViewer, setActiveViewer] = useState("tc-1");

  // Documents
  const [documents, setDocuments] = useState(() =>
    load("noor_documents", INITIAL_DOCUMENTS)
  );

  // Reminders
  const [reminders, setReminders] = useState(() =>
    load("noor_reminders", INITIAL_REMINDERS)
  );

  // Check-in
  const [checkIn, setCheckIn] = useState(() =>
    load("noor_checkin", { mood: null, time: null })
  );

  // Events + bookings
  const [events, setEvents] = useState(() =>
    load("noor_events", INITIAL_EVENTS)
  );
  const [myBookings, setMyBookings] = useState(() =>
    load("noor_bookings", [])
  );
  const [recommendedEvents, setRecommendedEvents] = useState(() =>
    load("noor_recommended", [])
  );

  // Shield submissions
  const [shieldMessages, setShieldMessages] = useState(() =>
    load("noor_shield", [])
  );

  // TrustCircle
  const [trustCircle, setTrustCircle] = useState(() =>
    load("noor_trust", INITIAL_TRUST_CIRCLE)
  );

  // Family-proposed reminders
  const [proposedReminders, setProposedReminders] = useState(() =>
    load("noor_proposed_reminders", [])
  );

  // Assistance requests
  const [assistanceRequests, setAssistanceRequests] = useState(() =>
    load("noor_assistance", [])
  );

  // Toast
  const [toast, setToast] = useState(null);

  // Persist on change
  useEffect(() => { save("noor_documents", documents); }, [documents]);
  useEffect(() => { save("noor_reminders", reminders); }, [reminders]);
  useEffect(() => { save("noor_checkin", checkIn); }, [checkIn]);
  useEffect(() => { save("noor_events", events); }, [events]);
  useEffect(() => { save("noor_bookings", myBookings); }, [myBookings]);
  useEffect(() => { save("noor_recommended", recommendedEvents); }, [recommendedEvents]);
  useEffect(() => { save("noor_shield", shieldMessages); }, [shieldMessages]);
  useEffect(() => { save("noor_trust", trustCircle); }, [trustCircle]);
  useEffect(() => { save("noor_proposed_reminders", proposedReminders); }, [proposedReminders]);
  useEffect(() => { save("noor_assistance", assistanceRequests); }, [assistanceRequests]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Permission Evaluation Helper
  // Checks if a specific contact (or the currently logged-in family viewer) has permission for a domain ("health", "checkins", "shield")
  const hasPermission = (permissionKey, contactId = null) => {
    const targetId = contactId || activeViewer;
    // 1. First, search strictly by target ID (so activeViewer determines the specific viewer's permissions)
    let contact = trustCircle.find((c) => c.id === targetId);

    // 2. Only if no contact matched that ID, fall back to the first contact with family relation
    if (!contact) {
      contact = trustCircle.find(
        (c) => ["Son", "Daughter", "Child", "Family"].includes(c.relation) || c.name === "Aarav Sharma"
      );
    }

    if (!contact) return false;
    return (contact.permissions || []).includes(permissionKey);
  };

  const updateTrustPermissions = (contactId, permissionKey) => {
    setTrustCircle((prev) =>
      prev.map((c) => {
        if (c.id !== contactId) return c;
        const perms = c.permissions || [];
        const updated = perms.includes(permissionKey)
          ? perms.filter((p) => p !== permissionKey)
          : [...perms, permissionKey];
        return { ...c, permissions: updated };
      })
    );
    showToast("Sharing permissions updated.");
  };

  // Document actions
  const addDocument = (doc) => {
    const newDoc = { ...doc, id: `doc-${Date.now()}`, shared: true };
    setDocuments((prev) => [newDoc, ...prev]);
    showToast("Document added successfully.");
  };
  const deleteDocument = (id) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    showToast("Document removed.");
  };
  const toggleDocumentShare = (id) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, shared: !d.shared } : d))
    );
  };

  // Reminder actions
  const markReminderDone = (id) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, done: true } : r))
    );
    showToast("Reminder marked as done!");
  };
  const snoozeReminder = (id) => {
    showToast("Reminder snoozed for 30 minutes.");
  };
  const addReminder = (reminder) => {
    const newRem = { ...reminder, id: `rem-${Date.now()}`, done: false };
    setReminders((prev) => [...prev, newRem]);
    showToast("Reminder added.");
  };

  // Check-in actions
  const submitCheckIn = (mood) => {
    const now = new Date();
    setCheckIn({
      mood,
      time: now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    });
    showToast("Check-in recorded.");
  };

  // Event/booking actions
  const bookEvent = (eventId) => {
    if (myBookings.includes(eventId)) {
      showToast("Already registered for this event.", "info");
      return;
    }
    setMyBookings((prev) => [...prev, eventId]);
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId ? { ...e, bookedSeats: e.bookedSeats + 1 } : e
      )
    );
    showToast("Event booked! Added to My Activities.");
  };
  const cancelBooking = (eventId) => {
    setMyBookings((prev) => prev.filter((id) => id !== eventId));
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId ? { ...e, bookedSeats: Math.max(0, e.bookedSeats - 1) } : e
      )
    );
    showToast("Booking cancelled.");
  };
  const recommendEvent = (eventId) => {
    if (recommendedEvents.includes(eventId)) {
      showToast("Already recommended.", "info");
      return;
    }
    setRecommendedEvents((prev) => [...prev, eventId]);
    showToast("Event recommended to Meera Ji!");
  };

  // Shield actions:
  // Step 1: Scan message locally (gives immediate preliminary analysis, stays draft/analyzed)
  const scanShieldMessage = (text, screenshot = null) => {
    const keywords = [
      "otp", "urgent", "account blocked", "click immediately",
      "send your password", "urgent payment", "wire transfer", "lottery",
      "prize", "verify your bank", "suspend", "kyc update", "aadhar block", "share otp"
    ];
    const lower = text.toLowerCase();
    const flagged = keywords.some((k) => lower.includes(k));
    const newMsg = {
      id: `shield-${Date.now()}`,
      text,
      screenshot: screenshot || null,
      flagged,
      status: "analyzed", // NOT sent to family until explicitly dispatched
      sentToFamily: false,
      familyVerdict: null,
      familyNote: "",
      submittedAt: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    };
    setShieldMessages((prev) => [newMsg, ...prev]);
    showToast("Analysis complete. Review the warning signs below.");
    return newMsg;
  };

  // Step 2: Explicit "Send to Family for Review" button
  const sendShieldMessageToFamily = (id) => {
    setShieldMessages((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, sentToFamily: true, status: "pending" } : m
      )
    );
    showToast("Sent to family for secondary review. They have been alerted.");
  };

  const reviewShieldMessage = (id, verdict, note) => {
    setShieldMessages((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: "reviewed", familyVerdict: verdict, familyNote: note } : m
      )
    );
    showToast("Review submitted. Meera Ji has been notified.");
  };

  // TrustCircle actions
  const addTrustContact = (contact) => {
    const newContact = { ...contact, id: `tc-${Date.now()}`, status: "pending" };
    setTrustCircle((prev) => [...prev, newContact]);
    showToast("Contact added to TrustCircle.");
  };
  const removeTrustContact = (id) => {
    setTrustCircle((prev) => prev.filter((c) => c.id !== id));
    showToast("Contact removed from TrustCircle.");
  };

  // Proposed reminders (family → senior)
  const proposeReminder = (reminder) => {
    const newRem = { ...reminder, id: `prop-${Date.now()}`, status: "pending" };
    setProposedReminders((prev) => [...prev, newRem]);
    showToast("Reminder proposed to Meera Ji.");
  };
  const acceptProposedReminder = (id) => {
    const rem = proposedReminders.find((r) => r.id === id);
    if (rem) {
      addReminder({ time: rem.time, title: rem.title });
      setProposedReminders((prev) => prev.filter((r) => r.id !== id));
      showToast("Reminder added to your routine.");
    }
  };
  const declineProposedReminder = (id) => {
    setProposedReminders((prev) => prev.filter((r) => r.id !== id));
    showToast("Reminder declined.");
  };

  // Assistance requests:
  // Family creates request -> Assigned trusted contact responds -> Both Senior and Family see the status
  const requestAssistance = (contactId, message) => {
    const newReq = {
      id: `assist-${Date.now()}`,
      contactId,
      message,
      status: "pending",
      createdAt: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    };
    setAssistanceRequests((prev) => [...prev, newReq]);
    showToast("Assistance request dispatched to trusted contact.");
  };

  const respondAssistance = (id, response) => {
    setAssistanceRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: response } : r))
    );
    showToast(`Trusted contact marked request as ${response}.`);
  };

  const resetDemo = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <AppContext.Provider
      value={{
        documents, addDocument, deleteDocument, toggleDocumentShare,
        reminders, markReminderDone, snoozeReminder, addReminder,
        checkIn, submitCheckIn,
        events, myBookings, bookEvent, cancelBooking,
        recommendedEvents, recommendEvent,
        shieldMessages, scanShieldMessage, sendShieldMessageToFamily, reviewShieldMessage,
        trustCircle, addTrustContact, removeTrustContact, updateTrustPermissions,
        proposedReminders, proposeReminder, acceptProposedReminder, declineProposedReminder,
        assistanceRequests, requestAssistance, respondAssistance,
        hasPermission, activeViewer, setActiveViewer,
        toast, showToast,
        resetDemo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
