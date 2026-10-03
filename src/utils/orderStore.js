/**
 * Order Store — persistent orders with live subscriptions.
 * All order reads/writes go through this file.
 */

const KEY = 'stylecraft:orders';
const EVT = 'orders:update';

/* ---------- Internal helpers ---------- */
const read = () => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const write = (list) => {
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(EVT)); // 🔔 notify every subscriber
};

const uid = () =>
  `SC-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 5)
    .toUpperCase()}`;

/* ---------- Public API ---------- */

export const getOrders = () => read();

/**
 * Create a new order and return it (with generated id).
 * @param {Object} payload  — { items, total, address, payment, userEmail, userName }
 */
export const addOrder = (payload) => {
  const order = {
    id: uid(),
    createdAt: new Date().toISOString(),
    date: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    deliveredOn: null,
    status: 'Processing', // Processing → Shipped → Delivered
    total: 0,
    items: [],
    address: '',
    payment: '',
    userEmail: 'guest',
    userName: 'Guest',
    ...payload,
  };

  write([order, ...read()]); // newest first
  return order;
};

export const updateOrderStatus = (id, status, extras = {}) => {
  write(read().map((o) => (o.id === id ? { ...o, status, ...extras } : o)));
};

export const removeOrder = (id) => {
  write(read().filter((o) => o.id !== id));
};

export const clearOrders = () => write([]);

/** Subscribe to store changes → returns unsubscribe function */
export const subscribe = (cb) => {
  const handler = () => cb(read());
  window.addEventListener(EVT, handler);
  window.addEventListener('storage', handler); // cross-tab sync
  return () => {
    window.removeEventListener(EVT, handler);
    window.removeEventListener('storage', handler);
  };
};