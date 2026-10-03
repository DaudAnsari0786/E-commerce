/* ================================================================
   Shared wishlist store
   ================================================================ */

let _wishlistCache = null;

export const readWishlist = () => {
  if (_wishlistCache) return _wishlistCache;
  try {
    const raw = localStorage.getItem('wishlist');
    _wishlistCache = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(_wishlistCache)) _wishlistCache = [];
  } catch {
    _wishlistCache = [];
  }
  return _wishlistCache;
};

export const invalidateWishlistCache = () => {
  _wishlistCache = null;
};

const channel =
  typeof window !== 'undefined' && 'BroadcastChannel' in window
    ? new BroadcastChannel('stylecraft-wishlist')
    : null;

export const getWishlistChannel = () => channel;

const notify = (payload) => {
  _wishlistCache = payload;
  try {
    window.dispatchEvent(
      new CustomEvent('wishlist:updated', { detail: payload })
    );
    channel?.postMessage({ type: 'wishlist:updated', detail: payload });
  } catch {}
};

let _writeScheduled = false;
let _pending = null;

const scheduleWrite = () => {
  _pending = _wishlistCache;
  if (_writeScheduled) return;
  _writeScheduled = true;

  const flush = () => {
    _writeScheduled = false;
    const payload = _pending;
    _pending = null;
    try {
      localStorage.setItem('wishlist', JSON.stringify(payload));
    } catch {}
    notify(payload);
  };

  Promise.resolve().then(flush);
};

export const setWishlist = (next) => {
  _wishlistCache = Array.isArray(next) ? next : [];
  scheduleWrite();
  return _wishlistCache;
};

export const toggleWishlist = (product) => {
  const current = readWishlist();
  const exists = current.some((i) => i.id === product.id);
  _wishlistCache = exists
    ? current.filter((i) => i.id !== product.id)
    : [...current, product];
  scheduleWrite();
  return _wishlistCache;
};

export const removeFromWishlist = (id) => {
  _wishlistCache = readWishlist().filter((i) => i.id !== id);
  scheduleWrite();
  return _wishlistCache;
};

export const clearWishlist = () => {
  _wishlistCache = [];
  scheduleWrite();
  return _wishlistCache;
};

export const subscribeWishlist = (onChange) => {
  const handler = (payload) => {
    const fresh = Array.isArray(payload) ? payload : readWishlist();
    onChange(fresh);
  };

  const onCustom = (e) => handler(e?.detail);
  const onStorage = (e) => {
    if (e.key !== 'wishlist') return;
    invalidateWishlistCache();
    handler(readWishlist());
  };
  const onBroadcast = (msg) => {
    if (msg?.type === 'wishlist:updated') handler(msg.detail);
  };

  window.addEventListener('wishlist:updated', onCustom);
  window.addEventListener('storage', onStorage);
  channel?.addEventListener('message', onBroadcast);

  return () => {
    window.removeEventListener('wishlist:updated', onCustom);
    window.removeEventListener('storage', onStorage);
    channel?.removeEventListener('message', onBroadcast);
  };
};