import { useState, useEffect, useCallback } from 'react';
import { readWishlist, subscribeWishlist } from '../utils/wishlistStore';

export const useWishlistCount = () => {
  const [count, setCount] = useState(0);

  const apply = useCallback((payload) => {
    setCount(Array.isArray(payload) ? payload.length : 0);
  }, []);

  useEffect(() => {
    setCount(readWishlist().length);
    const unsubscribe = subscribeWishlist(apply);
    return unsubscribe;
  }, [apply]);

  return count;
};

export default useWishlistCount;