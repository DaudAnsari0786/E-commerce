/* ================================================================
   Shared cart store
   ================================================================ */

let _cartCache = null;

export const readCart = () => {
  if (_cartCache) return _cartCache;
  try {
    const raw = localStorage.getItem('cart');
    _cartCache = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(_cartCache)) _cartCache = [];
  } catch {
    _cartCache = [];
  }
  return _cartCache;
};

export const invalidateCache = () => {
  _cartCache = null;
};

const channel =
  typeof window !== 'undefined' && 'BroadcastChannel' in window
    ? new BroadcastChannel('stylecraft-cart')
    : null;

export const getCartChannel = () => channel;

const notify = (payload) => {
  _cartCache = payload;
  try {
    window.dispatchEvent(new CustomEvent('cart:updated', { detail: payload }));
    channel?.postMessage({ type: 'cart:updated', detail: payload });
  } catch {}
};

let _writeScheduled = false;
let _pending = null;

const scheduleWrite = () => {
  _pending = _cartCache;
  if (_writeScheduled) return;
  _writeScheduled = true;

  const flush = () => {
    _writeScheduled = false;
    const payload = _pending;
    _pending = null;
    try {
      localStorage.setItem('cart', JSON.stringify(payload));
    } catch {}
    notify(payload);
  };

  Promise.resolve().then(flush);
};

export const setCart = (next) => {
  _cartCache = Array.isArray(next) ? next : [];
  scheduleWrite();
  return _cartCache;
};

export const addToCart = (product) => {
  const current = readCart();
  const idx = current.findIndex((i) => i.id === product.id);
  if (idx > -1) {
    _cartCache = current.map((i, n) =>
      n === idx ? { ...i, quantity: (i.quantity ?? i.qty ?? 1) + 1 } : i
    );
  } else {
    _cartCache = [...current, { ...product, quantity: 1 }];
  }
  scheduleWrite();
  return _cartCache;
};

export const updateQty = (id, delta) => {
  _cartCache = readCart().map((i) =>
    i.id === id
      ? {
          ...i,
          quantity: Math.max(
            1,
            Math.min(i.stock ?? 99, (i.quantity ?? i.qty ?? 1) + delta)
          ),
        }
      : i
  );
  scheduleWrite();
  return _cartCache;
};

export const removeFromCart = (id) => {
  _cartCache = readCart().filter((i) => i.id !== id);
  scheduleWrite();
  return _cartCache;
};

export const clearCart = () => {
  _cartCache = [];
  scheduleWrite();
  return _cartCache;
};

export const subscribeCart = (onChange) => {
  const handler = (payload) => {
    const fresh = Array.isArray(payload) ? payload : readCart();
    onChange(fresh);
  };

  const onCustom = (e) => handler(e?.detail);
  const onStorage = (e) => {
    if (e.key !== 'cart') return;
    invalidateCache();
    handler(readCart());
  };
  const onBroadcast = (msg) => {
    if (msg?.type === 'cart:updated') handler(msg.detail);
  };

  window.addEventListener('cart:updated', onCustom);
  window.addEventListener('storage', onStorage);
  channel?.addEventListener('message', onBroadcast);

  return () => {
    window.removeEventListener('cart:updated', onCustom);
    window.removeEventListener('storage', onStorage);
    channel?.removeEventListener('message', onBroadcast);
  };
};