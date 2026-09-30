import { useState, useEffect, useCallback } from 'react';
import { readCart, subscribeCart } from '../utils/cartStore';

const countItems = (cart) =>
  Array.isArray(cart)
    ? cart.reduce((sum, i) => sum + (i.quantity ?? i.qty ?? 1), 0)
    : 0;

export const useCartCount = () => {
  const [count, setCount] = useState(() => countItems(readCart()));

  const apply = useCallback((payload) => {
    setCount(countItems(payload));
  }, []);

  useEffect(() => {
    setCount(countItems(readCart()));
    const unsubscribe = subscribeCart(apply);
    return unsubscribe;
  }, [apply]);

  return count;
};

export default useCartCount;