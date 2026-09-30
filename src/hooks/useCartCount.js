import { useState, useEffect, useCallback } from 'react';
import { readCart, getCartChannel } from '../utils/cartStore';

const countItems = (cart) =>
  Array.isArray(cart)
    ? cart.reduce((sum, i) => sum + (i.quantity ?? i.qty ?? 1), 0)
    : 0;

export const useCartCount = () => {
  const [count, setCount] = useState(() => countItems(readCart()));

  const apply = useCallback((payload) => {
    if (Array.isArray(payload)) setCount(countItems(payload));
  }, []);

  useEffect(() => {
    setCount(countItems(readCart()));

    const onCustom = (e) => apply(e?.detail);
    const onStorage = (e) => {
      if (e.key !== 'cart') return;
      apply(readCart());
    };

    window.addEventListener('cart:updated', onCustom);
    window.addEventListener('storage', onStorage);

    const channel = getCartChannel();
    const onBroadcast = (msg) => {
      if (msg?.type === 'cart:updated') apply(msg.detail);
    };
    channel?.addEventListener('message', onBroadcast);

    return () => {
      window.removeEventListener('cart:updated', onCustom);
      window.removeEventListener('storage', onStorage);
      channel?.removeEventListener('message', onBroadcast);
    };
  }, [apply]);

  return count;
};

export default useCartCount;