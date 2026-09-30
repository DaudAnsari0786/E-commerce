import { useState, useEffect, useCallback } from 'react';
import { readCart, subscribeCart, invalidateCache } from '../utils/cartStore';

const normalize = (p) => ({
  id: p.id,
  name: p.name,
  category: p.category || 'Girls',
  slug:
    p.slug ||
    (p.category ? p.category.toLowerCase().replace(/\s+/g, '-') : 'products'),
  price: p.price,
  oldPrice: p.oldPrice ?? null,
  image: p.image,
  size: p.size || null,
  color: p.color || null,
  qty: p.quantity ?? p.qty ?? 1,
  stock: p.stock ?? 99,
});

export const useCartAutoReload = () => {
  const [items, setItems] = useState(() => readCart().map(normalize));

  const apply = useCallback((payload) => {
    const fresh = Array.isArray(payload) ? payload : readCart();
    setItems(fresh.map(normalize));
  }, []);

  useEffect(() => {
    invalidateCache();
    apply(readCart());

    const unsubscribe = subscribeCart(apply);
    return unsubscribe;
  }, [apply]);

  const refresh = useCallback(() => {
    invalidateCache();
    apply(readCart());
  }, [apply]);

  return { items, refresh };
};

export default useCartAutoReload;