export interface Route {
  id: number;
  title: string;
  from: string;
  to: string;
  covered: string;
  timing: string;
  vehicle: string;
  category: "school" | "college" | "university";
  createdAt: string;
}

export interface Message {
  id: number;
  name: string;
  phone: string;
  message: string;
  status: "unresolved" | "resolved";
  createdAt: string;
}

export interface ContactRequest {
  id: number;
  name: string;
  phone: string;
  pickupLocation: string;
  message: string;
  status: "new" | "replied";
  createdAt: string;
}

const ROUTES_KEY = "mts_routes";
const MESSAGES_KEY = "mts_messages";
const CONTACTS_KEY = "mts_contacts";

const defaultRoutes: Route[] = [
  { id: 1, title: "Bahria Town to DHA Route", from: "Bahria Town, Rawalpindi", to: "DHA Phase, Islamabad", covered: "DHA Schools, DHA Colleges", timing: "7:00 AM - 2:00 PM", vehicle: "Vans & Hiace", category: "school", createdAt: new Date().toISOString() },
  { id: 2, title: "Gulrez to PWD Route", from: "Gulrez, Rawalpindi", to: "PWD Road, Rawalpindi", covered: "Government Colleges", timing: "8:00 AM - 3:00 PM", vehicle: "Buses & Vans", category: "college", createdAt: new Date().toISOString() },
  { id: 3, title: "Saddar to Rawalpindi Route", from: "Saddar Bazaar, Rawalpindi", to: "Rawalpindi City Center", covered: "Private Colleges, Universities", timing: "7:30 AM - 4:00 PM", vehicle: "All Vehicles", category: "university", createdAt: new Date().toISOString() },
  { id: 4, title: "Rawalpindi to Islamabad University Belt", from: "Rawalpindi", to: "H-9, Islamabad", covered: "COMSATS, QAU, NUML", timing: "7:00 AM - 5:00 PM", vehicle: "Coaster Buses", category: "university", createdAt: new Date().toISOString() },
  { id: 5, title: "Bahria Phase 8 School Route", from: "Bahria Phase 8", to: "Multiple Schools", covered: "Beaconhouse, City School, Roots", timing: "7:00 AM - 2:00 PM", vehicle: "Vans", category: "school", createdAt: new Date().toISOString() },
  { id: 6, title: "G-11 to Islamabad College Zone", from: "G-11 Markaz", to: "F-6, F-7 Islamabad", covered: "Islamabad College, Federal College", timing: "8:00 AM - 3:00 PM", vehicle: "Hiace & Buses", category: "college", createdAt: new Date().toISOString() },
];

function getRoutes(): Route[] {
  const raw = localStorage.getItem(ROUTES_KEY);
  if (!raw) {
    localStorage.setItem(ROUTES_KEY, JSON.stringify(defaultRoutes));
    return defaultRoutes;
  }
  return JSON.parse(raw);
}

function saveRoutes(routes: Route[]) {
  localStorage.setItem(ROUTES_KEY, JSON.stringify(routes));
}

function getMessages(): Message[] {
  const raw = localStorage.getItem(MESSAGES_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveMessages(messages: Message[]) {
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
}

function getContacts(): ContactRequest[] {
  const raw = localStorage.getItem(CONTACTS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveContacts(contacts: ContactRequest[]) {
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
}

function nextId(items: { id: number }[]) {
  return items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
}

export const storage = {
  // Routes
  getRoutes,
  addRoute(route: Omit<Route, "id" | "createdAt">) {
    const routes = getRoutes();
    const newRoute: Route = { ...route, id: nextId(routes), createdAt: new Date().toISOString() };
    saveRoutes([...routes, newRoute]);
    return newRoute;
  },
  updateRoute(id: number, updates: Partial<Omit<Route, "id" | "createdAt">>) {
    const routes = getRoutes().map((r) => (r.id === id ? { ...r, ...updates } : r));
    saveRoutes(routes);
  },
  deleteRoute(id: number) {
    saveRoutes(getRoutes().filter((r) => r.id !== id));
  },

  // Messages
  getMessages,
  addMessage(msg: Omit<Message, "id" | "status" | "createdAt">) {
    const messages = getMessages();
    const newMsg: Message = { ...msg, id: nextId(messages), status: "unresolved", createdAt: new Date().toISOString() };
    saveMessages([newMsg, ...messages]);
    return newMsg;
  },
  updateMessageStatus(id: number, status: "unresolved" | "resolved") {
    saveMessages(getMessages().map((m) => (m.id === id ? { ...m, status } : m)));
  },
  deleteMessage(id: number) {
    saveMessages(getMessages().filter((m) => m.id !== id));
  },

  // Contacts
  getContacts,
  addContact(contact: Omit<ContactRequest, "id" | "status" | "createdAt">) {
    const contacts = getContacts();
    const newContact: ContactRequest = { ...contact, id: nextId(contacts), status: "new", createdAt: new Date().toISOString() };
    saveContacts([newContact, ...contacts]);
    return newContact;
  },
  updateContactStatus(id: number, status: "new" | "replied") {
    saveContacts(getContacts().map((c) => (c.id === id ? { ...c, status } : c)));
  },
  deleteContact(id: number) {
    saveContacts(getContacts().filter((c) => c.id !== id));
  },
};
