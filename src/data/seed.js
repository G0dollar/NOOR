// NOOR Demo Seed Data — Fictional characters only

export const SENIOR = {
  name: "Meera Sharma",
  age: 68,
  location: "Pune",
  avatar: "MS",
};

export const FAMILY = {
  name: "Aarav Sharma",
  relation: "Son",
  avatar: "AS",
};

export const TRUSTED_CONTACT = {
  name: "Anita Kulkarni",
  relation: "Neighbour",
  avatar: "AK",
};

export const INITIAL_DOCUMENTS = [
  {
    id: "doc-1",
    title: "Blood Test Report",
    type: "Blood Report",
    date: "2026-10-10",
    note: "Routine annual check. HB: 12.4, Sugar: 98",
    shared: true,
  },
  {
    id: "doc-2",
    title: "Dr. Mehta Prescription",
    type: "Prescription",
    date: "2026-10-05",
    note: "Vitamin D3 + Calcium tablets - 30 days course",
    shared: true,
  },
  {
    id: "doc-3",
    title: "Knee X-Ray Report",
    type: "Blood Report",
    date: "2026-09-18",
    note: "Mild osteoarthritis Grade 1. Follow-up in 3 months.",
    shared: false,
  },
];

export const INITIAL_REMINDERS = [
  { id: "rem-1", time: "09:00 AM", title: "Morning Medication", done: false },
  { id: "rem-2", time: "01:00 PM", title: "Lunch", done: false },
  { id: "rem-3", time: "06:00 PM", title: "Evening Walk", done: false },
  { id: "rem-4", time: "09:00 PM", title: "Night Medication", done: false },
];

export const INITIAL_EVENTS = [
  {
    id: "evt-1",
    title: "Sunday Carrom Circle",
    category: "Carrom",
    location: "Viman Nagar, Pune",
    date: "Sunday, 5:00 PM",
    host: "Ramesh Deshpande",
    type: "Free",
    seats: 8,
    bookedSeats: 2,
    emoji: "🎯",
  },
  {
    id: "evt-2",
    title: "Morning Wellness Walk",
    category: "Morning Walks",
    location: "Kalyani Nagar, Pune",
    date: "Saturday, 7:00 AM",
    host: "Priya Joshi",
    type: "Free",
    seats: 20,
    bookedSeats: 7,
    emoji: "🚶",
  },
  {
    id: "evt-3",
    title: "Evening Bhajan Gathering",
    category: "Bhajans",
    location: "Aundh, Pune",
    date: "Friday, 6:00 PM",
    host: "Sunita Rao",
    type: "Free",
    seats: 30,
    bookedSeats: 12,
    emoji: "🎵",
  },
  {
    id: "evt-4",
    title: "Beginner Painting Workshop",
    category: "Hobby Classes",
    location: "Kothrud, Pune",
    date: "Sunday, 11:00 AM",
    host: "Meenakshi Arts",
    type: "Premium",
    seats: 15,
    bookedSeats: 9,
    emoji: "🎨",
  },
  {
    id: "evt-5",
    title: "Morning Yoga Session",
    category: "Yoga",
    location: "Baner, Pune",
    date: "Daily, 6:30 AM",
    host: "Yog Gurukul",
    type: "Free",
    seats: 25,
    bookedSeats: 14,
    emoji: "🧘",
  },
  {
    id: "evt-6",
    title: "Gardening Club Meet",
    category: "Gardening",
    location: "Wakad, Pune",
    date: "Saturday, 10:00 AM",
    host: "Green Thumbs Society",
    type: "Free",
    seats: 12,
    bookedSeats: 4,
    emoji: "🌱",
  },
];

export const INITIAL_TRUST_CIRCLE = [
  {
    id: "tc-1",
    name: "Aarav Sharma",
    relation: "Son",
    avatar: "AS",
    status: "active",
    permissions: ["health", "checkins", "shield"],
  },
  {
    id: "tc-2",
    name: "Anita Kulkarni",
    relation: "Neighbour",
    avatar: "AK",
    status: "active",
    permissions: ["checkins"],
  },
];

export const SCAM_KEYWORDS = [
  "otp", "urgent", "account blocked", "click immediately",
  "send your password", "urgent payment", "wire transfer",
  "lottery", "prize", "verify your bank", "suspend",
  "kyc update", "aadhar block", "share otp",
];
