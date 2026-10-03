import { useState, useEffect, useCallback } from 'react';
import {
  readWishlist,
  subscribeWishlist,
  invalidateWishlistCache,
} from '../utils/wishlistStore';

export const useWishlistAutoReload = () => {
  const [items, setItems] = useState(() => readWishlist());

  const apply = useCallback((payload) => {
    setItems(Array.isArray(payload) ? payload : readWishlist());
  }, []);

  useEffect(() => {
    invalidateWishlistCache();
    apply(readWishlist());
    const unsubscribe = subscribeWishlist(apply);
    return unsubscribe;
  }, [apply]);

  const refresh = useCallback(() => {
    invalidateWishlistCache();
    apply(readWishlist());
  }, [apply]);

  return { items, refresh };
};

export default useWishlistAutoReload;